import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { DeliveryType, GuestContact, PaymentStatus } from '@workspace/typescript-config/types';

export type { DeliveryType, GuestContact, PaymentStatus };

export interface CheckoutState {
  step: number;
  selectedAddressId: string | null;
  deliveryType: DeliveryType | null;
  slotId: string | null;
  deliveryNotes: string;
  guestContact: GuestContact;
  couponCode: string | null;
  idempotencyKey: string | null;
  paymentStatus: PaymentStatus;
}

const initialState: CheckoutState = {
  step: 1,
  selectedAddressId: null,
  deliveryType: null,
  slotId: null,
  deliveryNotes: '',
  guestContact: {
    verified: false,
  },
  couponCode: null,
  idempotencyKey: null,
  paymentStatus: 'idle',
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setSelectedAddress(state, action: PayloadAction<string | null>) {
      state.selectedAddressId = action.payload;
    },
    setDeliverySlot(
      state,
      action: PayloadAction<{ type: DeliveryType | null; slotId: string | null }>
    ) {
      state.deliveryType = action.payload.type;
      state.slotId = action.payload.slotId;
    },
    setDeliveryNotes(state, action: PayloadAction<string>) {
      state.deliveryNotes = action.payload;
    },
    setGuestContact(state, action: PayloadAction<Partial<GuestContact>>) {
      state.guestContact = { ...state.guestContact, ...action.payload };
    },
    setCouponCode(state, action: PayloadAction<string | null>) {
      state.couponCode = action.payload;
    },
    setIdempotencyKey(state, action: PayloadAction<string | null>) {
      state.idempotencyKey = action.payload;
    },
    setPaymentStatus(
      state,
      action: PayloadAction<'idle' | 'processing' | 'success' | 'failed'>
    ) {
      state.paymentStatus = action.payload;
    },
    resetCheckout() {
      return initialState;
    },
  },
});

export const {
  setStep,
  setSelectedAddress,
  setDeliverySlot,
  setDeliveryNotes,
  setGuestContact,
  setCouponCode,
  setIdempotencyKey,
  setPaymentStatus,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
