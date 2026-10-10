import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@workspace/typescript-config/types';

export type { CartItem };

export interface CouponData {
  code: string;
  discountCents: number;
  descriptionEn: string;
  descriptionZh: string;
}

export interface CartNotification {
  id: string;
  messageEn: string;
  messageZh: string;
  type?: 'success' | 'info' | 'error';
  actionLabelEn?: string;
  actionLabelZh?: string;
  actionType?: 'undo' | 'link';
  actionHref?: string;
}

export interface CartState {
  items: CartItem[];
  savedItems: CartItem[];
  appliedCoupon: CouponData | null;
  pendingItemIds: string[];
  lastAddedItemId: string | null;
  lastRemovedItem: { item: CartItem; index: number } | null;
  isDrawerOpen: boolean; // Kept as false for backwards compatibility
  notification: CartNotification | null;
}

const initialSampleItems: CartItem[] = [
  {
    variantId: 'var-ig-5kg',
    productId: 'prod-ig-basmati-5kg',
    title: 'India Gate Classic Aged Basmati Rice',
    brand: 'India Gate',
    packSize: '5 kg',
    price: 128.0,
    mrp: 145.0,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    originCountry: 'India',
  },
  {
    variantId: 'var-sh-bb-60g',
    productId: 'prod-shan-bombay-biryani',
    title: 'Shan Special Bombay Biryani Mix',
    brand: 'Shan Foods',
    packSize: '60 g',
    price: 14.5,
    mrp: 18.0,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    originCountry: 'Pakistan',
  },
  {
    variantId: 'var-ash-10kg',
    productId: 'prod-aashirvaad-atta-10kg',
    title: 'Aashirvaad 100% Whole Wheat Chakki Atta',
    brand: 'Aashirvaad',
    packSize: '10 kg',
    price: 98.0,
    mrp: 115.0,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    originCountry: 'India',
  },
];

const initialState: CartState = {
  items: initialSampleItems,
  savedItems: [],
  appliedCoupon: null,
  pendingItemIds: [],
  lastAddedItemId: null,
  lastRemovedItem: null,
  isDrawerOpen: false,
  notification: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adding item to cart
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find((item) => item.variantId === action.payload.variantId);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.lastAddedItemId = action.payload.variantId;
      state.notification = {
        id: Date.now().toString(),
        messageEn: `Added "${action.payload.title}" to cart`,
        messageZh: `已將「${action.payload.title}」加入購物車`,
        type: 'success',
        actionLabelEn: 'View Cart',
        actionLabelZh: '查看購物車',
        actionType: 'link',
        actionHref: '/cart',
      };
    },

    // Updating quantity
    updateQuantity(state, action: PayloadAction<{ variantId: string; quantity: number }>) {
      const { variantId, quantity } = action.payload;
      const index = state.items.findIndex((item) => item.variantId === variantId);
      if (index !== -1) {
        if (quantity <= 0) {
          const removed = state.items[index];
          if (removed) {
            state.lastRemovedItem = { item: removed, index };
            state.items.splice(index, 1);
            state.notification = {
              id: Date.now().toString(),
              messageEn: `Removed "${removed.title}" from cart`,
              messageZh: `已從購物車移除「${removed.title}」`,
              type: 'info',
              actionLabelEn: 'Undo',
              actionLabelZh: '復原',
              actionType: 'undo',
            };
          }
        } else {
          const currentItem = state.items[index];
          if (currentItem) {
            currentItem.quantity = quantity;
          }
        }
      }
    },

    // Removing item from cart
    removeFromCart(state, action: PayloadAction<string>) {
      const variantId = action.payload;
      const index = state.items.findIndex((item) => item.variantId === variantId);
      if (index !== -1) {
        const removed = state.items[index];
        if (removed) {
          state.lastRemovedItem = { item: removed, index };
          state.items.splice(index, 1);
          state.notification = {
            id: Date.now().toString(),
            messageEn: `Removed "${removed.title}" from cart`,
            messageZh: `已從購物車移除「${removed.title}」`,
            type: 'info',
            actionLabelEn: 'Undo',
            actionLabelZh: '復原',
            actionType: 'undo',
          };
        }
      }
    },

    // Undo remove action
    undoRemove(state) {
      if (state.lastRemovedItem) {
        const { item, index } = state.lastRemovedItem;
        const insertIndex = Math.min(index, state.items.length);
        state.items.splice(insertIndex, 0, item);
        state.lastRemovedItem = null;
        state.notification = {
          id: Date.now().toString(),
          messageEn: `Restored "${item.title}" to cart`,
          messageZh: `已將「${item.title}」復原至購物車`,
          type: 'success',
        };
      }
    },

    // Save item for later
    saveForLater(state, action: PayloadAction<string>) {
      const variantId = action.payload;
      const index = state.items.findIndex((item) => item.variantId === variantId);
      if (index !== -1) {
        const item = state.items[index];
        if (item) {
          state.items.splice(index, 1);
          // Avoid duplicate in savedItems
          const existingSaved = state.savedItems.find((s) => s.variantId === variantId);
          if (!existingSaved) {
            state.savedItems.push(item);
          }
          state.notification = {
            id: Date.now().toString(),
            messageEn: `Moved "${item.title}" to Saved for Later`,
            messageZh: `已將「${item.title}」移至稍後購買`,
            type: 'info',
          };
        }
      }
    },

    // Move saved item back to active cart
    moveToCart(state, action: PayloadAction<string>) {
      const variantId = action.payload;
      const index = state.savedItems.findIndex((s) => s.variantId === variantId);
      if (index !== -1) {
        const item = state.savedItems[index];
        if (item) {
          state.savedItems.splice(index, 1);
          const existingInCart = state.items.find((i) => i.variantId === variantId);
          if (existingInCart) {
            existingInCart.quantity += item.quantity || 1;
          } else {
            state.items.push({ ...item, quantity: item.quantity || 1 });
          }
          state.notification = {
            id: Date.now().toString(),
            messageEn: `Moved "${item.title}" to cart`,
            messageZh: `已將「${item.title}」加入購物車`,
            type: 'success',
          };
        }
      }
    },

    // Remove item from saved for later
    removeSavedItem(state, action: PayloadAction<string>) {
      state.savedItems = state.savedItems.filter((s) => s.variantId !== action.payload);
    },

    // Apply coupon
    applyCoupon(state, action: PayloadAction<CouponData>) {
      state.appliedCoupon = action.payload;
      state.notification = {
        id: Date.now().toString(),
        messageEn: `Coupon "${action.payload.code}" applied successfully`,
        messageZh: `已成功套用優惠碼「${action.payload.code}」`,
        type: 'success',
      };
    },

    // Remove coupon
    removeCoupon(state) {
      if (state.appliedCoupon) {
        const code = state.appliedCoupon.code;
        state.appliedCoupon = null;
        state.notification = {
          id: Date.now().toString(),
          messageEn: `Removed coupon "${code}"`,
          messageZh: `已移除優惠碼「${code}」`,
          type: 'info',
        };
      }
    },

    // Clear active notification
    clearNotification(state) {
      state.notification = null;
    },

    // Clear whole cart
    clearCart(state) {
      state.items = [];
      state.appliedCoupon = null;
    },

    // Backward compatibility drawer actions (safe no-ops)
    openCartDrawer(state) {
      state.isDrawerOpen = false;
    },
    closeCartDrawer(state) {
      state.isDrawerOpen = false;
    },
    toggleCartDrawer(state) {
      state.isDrawerOpen = false;
    },

    // Pending item states
    setPendingItem(state, action: PayloadAction<string>) {
      if (!state.pendingItemIds.includes(action.payload)) {
        state.pendingItemIds.push(action.payload);
      }
    },
    clearPendingItem(state, action: PayloadAction<string>) {
      state.pendingItemIds = state.pendingItemIds.filter((id) => id !== action.payload);
    },
    setLastAddedItem(state, action: PayloadAction<string | null>) {
      state.lastAddedItemId = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  undoRemove,
  saveForLater,
  moveToCart,
  removeSavedItem,
  applyCoupon,
  removeCoupon,
  clearNotification,
  clearCart,
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  setPendingItem,
  clearPendingItem,
  setLastAddedItem,
} = cartSlice.actions;

export default cartSlice.reducer;
