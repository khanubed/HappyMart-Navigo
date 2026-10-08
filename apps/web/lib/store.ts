import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/services/api';
import auth from '@/features/auth/authSlice';
import cart from '@/features/cart/cartSlice';
import checkout from '@/features/checkout/checkoutSlice';
import search from '@/features/search/searchSlice';
import filters from '@/features/filters/filtersSlice';
import ui from '@/features/ui/uiSlice';
import theme from '@/features/ui/themeSlice';
import locale from '@/features/ui/localeSlice';
import { persistListeners, loadPersisted } from './persist';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
  cart,
  checkout,
  search,
  filters,
  ui,
  theme,
  locale,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const listener = createListenerMiddleware();
  persistListeners(listener);

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: (preloadedState ?? loadPersisted()) as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listener.middleware)
        .concat(api.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
