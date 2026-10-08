# 11. State Management: Redux Toolkit and RTK Query

**Platform:** Happymart Storefront & Admin  
**Stack:** `@reduxjs/toolkit`, `react-redux`, RTK Query, Next.js App Router  
**Related Docs:** `architecture.md`, `PRD.md`, `design.md`

---

## 11.1 Principles

- **Server state lives in RTK Query:** Products, categories, cart, orders, addresses, banners: anything that originates from the backend API is fetched and cached exclusively by RTK Query. It is never duplicated into standard Redux slices.
- **Client state lives in slices:** Redux slices only store state that has no server copy: auth session meta, UI toggles/drawers, active theme, locale, checkout drafts, and recent search history.
- **URL is state too:** Category filters, sorting order, pagination, and search queries live directly in the URL query parameters (`?sort=price_asc&veg=true&page=1`) so listing pages are bookmarkable, shareable, and search-engine indexable. Selectors read from the URL; the `filtersSlice` only holds the transient draft while a shopper is inside the mobile filter sheet.
- **Cart is server side:** Both guest shoppers (via a `cart_token` cookie) and authenticated accounts have a server-backed cart. The `cartSlice` holds only transient UI state (cart drawer open/close, pending item IDs, last-added ID for header bump animation). Quantity adjustments use optimistic updates through RTK Query.
- **Forms use React Hook Form, not Redux:** Form inputs, field validation, and error states are managed by React Hook Form + Zod. Only checkout choices that must survive step-to-step navigation (such as selected address ID, chosen slot, delivery notes) are written to the `checkoutSlice`.
- **No derived data in the store:** Never compute or duplicate derived values (e.g., filtered arrays, computed subtotals) inside state. Use memoized selectors (`createSelector`).

---

## 11.2 Store contents (storefront)

| Store part | Contains | Persisted? |
|---|---|---|
| **`api`** *(RTK Query reducer)* | All cached server data, subscriptions, cache tags, query lifecycles | **No** (rebuilds automatically); refetches on reconnect & window focus |
| **`authSlice`** | `accessToken` (memory only), `user` (`{ id, name, role }`), `status` (`'idle' \| 'loading' \| 'authenticated' \| 'guest'`), `bootstrapped` flag | **No token persisted**; httpOnly refresh cookie securely restores session |
| **`cartSlice`** | `isDrawerOpen`, `pendingItemIds: string[]`, `lastAddedItemId: string \| null` (for bounce animation) | **No** |
| **`checkoutSlice`** | `step`, `selectedAddressId`, `deliveryType`, `slotId`, `deliveryNotes`, `guestContact` (`{ email, phone, verified }`), `couponCode`, `idempotencyKey`, `paymentStatus` | **sessionStorage** (persists across navigation, clears on tab close) |
| **`searchSlice`** | `recentSearches: string[]` (max 8 entries), `isSuggestOpen` | **localStorage** (recent search list only) |
| **`filtersSlice`** | Draft filter parameters for the mobile filter bottom sheet | **No** |
| **`uiSlice`** | `isMobileMenuOpen`, `isAuthModalOpen` + `authModalView`, `isFilterSheetOpen`, `announcementDismissedId`, `cookieConsent` | **localStorage** (dismissed announcement ID, cookie consent) |
| **`themeSlice`** | `mode: 'light' \| 'dark' \| 'system'` | **localStorage** (synced with `next-themes`) |
| **`localeSlice`** | `language: 'en' \| 'zh-HK'` | **localStorage + URL route prefix** (`/en`, `/zh-hk`) |

---

## 11.3 Store contents (admin)

| Store part | Contains | Persisted? |
|---|---|---|
| **`api`** | Cached admin resources (catalogue, inventory, orders, customer details, reports) | **No** |
| **`authSlice`** | `accessToken` (in-memory), `staffUser`, `role`, `permissions: string[]` | **No** |
| **`uiSlice`** | `sidebarCollapsed`, `isCommandPaletteOpen` | **localStorage** |
| **`themeSlice`** | `mode: 'light' \| 'dark' \| 'system'` | **localStorage** |
| **`tablePrefsSlice`** | Keyed by table ID: `pageSize`, column visibility toggle map, default sort column & direction | **localStorage** |
| **`importSlice`** | Active CSV import job ID, progress percentage, error summary row breakdown | **No** |

---

## 11.4 Store setup

```typescript
// app/store.ts
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/services/api';
import auth from '@/features/auth/authSlice';
import cart from '@/features/cart/cartSlice';
import checkout from '@/features/checkout/checkoutSlice';
import search from '@/features/search/searchSlice';
import ui from '@/features/ui/uiSlice';
import theme from '@/features/ui/themeSlice';
import locale from '@/features/ui/localeSlice';
import { persistListeners, loadPersisted } from './persist';

const listener = createListenerMiddleware();
persistListeners(listener); // writes theme, locale, search.recent, and ui preferences to storage

export const makeStore = (preloadedState = loadPersisted()) => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth,
      cart,
      checkout,
      search,
      ui,
      theme,
      locale,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listener.middleware)
        .concat(api.middleware),
  });

  setupListeners(store.dispatch); // enables refetchOnFocus and refetchOnReconnect
  return store;
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

> **Next.js App Router Provider Note:**  
> In Next.js App Router, wrap client tree components inside a client-side `<StoreProvider>` using React's `useRef` to maintain store identity across component re-renders while avoiding global singleton leaks across SSR requests.

---

## 11.5 Base API with automatic token refresh

```typescript
// services/api.ts
import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';
import { setToken, loggedOut } from '@/features/auth/authSlice';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? '' : 'http://localhost:4000') + '/api/v1';

const rawBase = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include', // transmits httpOnly refresh token and guest cart cookies
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    const language = (getState() as RootState).locale?.language || 'en';
    headers.set('accept-language', language);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, apiInstance, extraOptions) => {
  let result = await rawBase(args, apiInstance, extraOptions);

  // If 401 Unauthorized, attempt a single refresh token rotation
  if (result.error?.status === 401) {
    const refreshResult = await rawBase(
      { url: '/auth/refresh', method: 'POST' },
      apiInstance,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any)?.data?.accessToken;
      if (newAccessToken) {
        apiInstance.dispatch(setToken(newAccessToken));
        // Retry the original failed query with the fresh access token
        result = await rawBase(args, apiInstance, extraOptions);
      } else {
        apiInstance.dispatch(loggedOut());
      }
    } else {
      apiInstance.dispatch(loggedOut());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Me',
    'Address',
    'Cart',
    'Product',
    'ProductList',
    'Category',
    'Brand',
    'Banner',
    'Order',
    'OrderList',
    'Wishlist',
    'Review',
    'Delivery',
    'Content',
    'Coupon',
  ],
  keepUnusedDataFor: 60, // default cache retention: 60s
  refetchOnReconnect: true,
  endpoints: () => ({}), // injected per feature domain
});
```

---

## 11.6 Endpoint pattern with tags and optimistic cart update

```typescript
// features/cart/cartApi.ts
import { api } from '@/services/api';

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
}

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => '/cart',
      transformResponse: (response: ApiResponse<Cart>) => response.data,
      providesTags: ['Cart'],
    }),

    updateCartItem: builder.mutation<Cart, { variantId: string; quantity: number }>({
      query: (body) => ({
        url: '/cart/items',
        method: 'PUT',
        body,
      }),
      transformResponse: (response: ApiResponse<Cart>) => response.data,
      async onQueryStarted({ variantId, quantity }, { dispatch, queryFulfilled }) {
        // Optimistically apply the quantity change to the cache
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const lineItem = draft.items.find((item) => item.variantId === variantId);
            if (lineItem) {
              lineItem.quantity = quantity;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // Revert optimistic mutation if the server request fails
          patchResult.undo();
        }
      },
      invalidatesTags: ['Cart'], // server recalculates official promotions & totals
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartItemMutation } = cartApi;
```

---

## 11.7 Tag and cache strategy

| Data | Tag | Provided by | Invalidated by | Cache time |
|---|---|---|---|---|
| **Category tree** | `Category` (LIST) | `getCategoryTree` | Admin category changes (server cache purge on next load) | 1 hour |
| **Product list** | `ProductList` (by scope) | `getProducts` | Stock change events, admin product update | 60 s |
| **Product detail** | `Product` (id) | `getProduct` | `updateProduct` (admin), stock change | 60 s |
| **Cart** | `Cart` | `getCart` | Any cart mutation, login merge, checkout success | Always fresh after mutation |
| **Addresses** | `Address` | `getAddresses` | `createAddress`, `updateAddress`, `deleteAddress` | 5 min |
| **Orders** | `Order`, `OrderList` | `getOrders`, `getOrder` | `createOrder`, `cancelOrder`, status update; live polling | 30 s (poll while order active) |
| **Banners / CMS** | `Banner`, `Content` | `getBanners`, `getPage` | Admin content publish (cache purge) | 10 min |
| **Delivery slots** | `Delivery` | `getSlots` | After order placed (slot capacity changes) | 30 s |
| **Me (Profile)** | `Me` | `getMe` | `updateMe`, `logout` | Session lifespan |

---

## 11.8 Slice example (auth) and typed hooks

```typescript
// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'customer' | 'admin' | 'staff';
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'guest';
  bootstrapped: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  status: 'idle',
  bootstrapped: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.status = 'authenticated';
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    loggedOut(state) {
      state.accessToken = null;
      state.user = null;
      state.status = 'guest';
    },
    bootstrapped(state) {
      state.bootstrapped = true;
    },
  },
});

export const { setToken, setUser, loggedOut, bootstrapped } = authSlice.actions;
export default authSlice.reducer;
```

```typescript
// app/hooks.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed throughout the app in place of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

## 11.9 State rules for the team

1. **Never store API data in a slice:** If you feel the need to duplicate API response data, use an RTK Query cache tag, a memoized selector (`createSelector`), or `api.util.updateQueryData` instead.
2. **Never store the access token in localStorage:** The access token lives in memory only. The httpOnly `refresh_token` cookie silently restores the session on page reloads by calling `/auth/refresh` during app bootstrapping.
3. **Mutations that recalculate totals must invalidate tags:** Any backend mutation that recalculates cart items, delivery fees, or discounts must invalidate the corresponding tag (e.g., `invalidatesTags: ['Cart']`).
4. **Use `selectFromResult` for list optimization:** Avoid unnecessary re-rendering of large lists when a component only depends on a single field of a cached query result.
5. **Handle all query states gracefully:** Every hook usage must explicitly account for `isLoading`, `isError`, and empty collections with appropriate skeleton or fallback components.
6. **Use the `skip` query option for preconditions:** Prevent redundant or unauthorized API calls (for instance, pass `{ skip: !isAuthenticated }` to address queries).
7. **Clean up on logout:** Always purge sensitive client slices (`checkout`, `auth`) and invoke `api.util.resetApiState()` when a shopper logs out.
