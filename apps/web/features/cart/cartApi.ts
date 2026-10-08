import { api } from '@/services/api';
import type { Cart, CartItem, ApiResponse } from '@workspace/typescript-config/types';

export type { Cart, CartItem, ApiResponse };

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
          patchResult.undo();
        }
      },
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartItemMutation } = cartApi;
