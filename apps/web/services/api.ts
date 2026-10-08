import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setToken, loggedOut } from '@/features/auth/authSlice';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' ? '' : 'http://localhost:4000') + '/api/v1';

const rawBase = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include', // transmits httpOnly refresh token and guest cart cookies
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as any;
    const token = state?.auth?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    const language = state?.locale?.language || 'en';
    headers.set('accept-language', language);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  apiInstance,
  extraOptions
) => {
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
  keepUnusedDataFor: 60,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
