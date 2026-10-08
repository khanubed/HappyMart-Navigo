import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartUIState {
  isDrawerOpen: boolean;
  pendingItemIds: string[];
  lastAddedItemId: string | null;
}

const initialState: CartUIState = {
  isDrawerOpen: false,
  pendingItemIds: [],
  lastAddedItemId: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCartDrawer(state) {
      state.isDrawerOpen = true;
    },
    closeCartDrawer(state) {
      state.isDrawerOpen = false;
    },
    toggleCartDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
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
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  setPendingItem,
  clearPendingItem,
  setLastAddedItem,
} = cartSlice.actions;

export default cartSlice.reducer;
