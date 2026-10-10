import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  DeliveryType,
  GuestContact,
  PaymentStatus,
  HongKongAddress,
  Order,
} from '@workspace/typescript-config/types';

export type { DeliveryType, GuestContact, PaymentStatus, HongKongAddress, Order };

export interface CheckoutState {
  step: number;
  selectedAddressId: string | null;
  customAddress: HongKongAddress | null;
  deliveryType: DeliveryType | null;
  slotId: string | null;
  selectedDate: string;
  selectedSlotTime: string;
  deliveryNotes: string;
  leaveAtDoor: boolean;
  callOnArrival: boolean;
  accessCode: string;
  guestContact: GuestContact;
  paymentMethod: 'razorpay' | 'cod';
  couponCode: string | null;
  idempotencyKey: string | null;
  paymentStatus: PaymentStatus;
  termsAccepted: boolean;
  completedOrder: Order | null;
}

const initialSavedAddress: HongKongAddress = {
  id: 'addr-default-hk-1',
  contactName: 'Anil Sharma',
  contactPhone: '+852 9123 4567',
  region: 'Hong Kong Island',
  district: 'Wan Chai',
  zone: 'Wan Chai / Causeway Bay',
  building: 'Hennessy Court',
  floor: '18/F',
  unit: 'Flat B',
  isDefault: true,
};

const initialState: CheckoutState = {
  step: 1,
  selectedAddressId: 'addr-default-hk-1',
  customAddress: initialSavedAddress,
  deliveryType: 'scheduled',
  slotId: 'slot-sched-1',
  selectedDate: 'Tomorrow',
  selectedSlotTime: '10:00 AM – 1:00 PM',
  deliveryNotes: '',
  leaveAtDoor: false,
  callOnArrival: true,
  accessCode: '',
  guestContact: {
    email: 'anil.sharma@example.hk',
    phone: '91234567',
    verified: true,
  },
  paymentMethod: 'razorpay',
  couponCode: null,
  idempotencyKey: null,
  paymentStatus: 'idle',
  termsAccepted: false,
  completedOrder: null,
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
    setCustomAddress(state, action: PayloadAction<HongKongAddress | null>) {
      state.customAddress = action.payload;
    },
    setDeliverySlot(
      state,
      action: PayloadAction<{
        type: DeliveryType | null;
        slotId: string | null;
        date?: string;
        time?: string;
      }>
    ) {
      state.deliveryType = action.payload.type;
      state.slotId = action.payload.slotId;
      if (action.payload.date) state.selectedDate = action.payload.date;
      if (action.payload.time) state.selectedSlotTime = action.payload.time;
    },
    setDeliveryInstructions(
      state,
      action: PayloadAction<{
        notes?: string;
        leaveAtDoor?: boolean;
        callOnArrival?: boolean;
        accessCode?: string;
      }>
    ) {
      if (action.payload.notes !== undefined) state.deliveryNotes = action.payload.notes;
      if (action.payload.leaveAtDoor !== undefined) state.leaveAtDoor = action.payload.leaveAtDoor;
      if (action.payload.callOnArrival !== undefined) state.callOnArrival = action.payload.callOnArrival;
      if (action.payload.accessCode !== undefined) state.accessCode = action.payload.accessCode;
    },
    setDeliveryNotes(state, action: PayloadAction<string>) {
      state.deliveryNotes = action.payload;
    },
    setGuestContact(state, action: PayloadAction<Partial<GuestContact>>) {
      state.guestContact = { ...state.guestContact, ...action.payload };
    },
    setPaymentMethod(state, action: PayloadAction<'razorpay' | 'cod'>) {
      state.paymentMethod = action.payload;
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
    setTermsAccepted(state, action: PayloadAction<boolean>) {
      state.termsAccepted = action.payload;
    },
    setCompletedOrder(state, action: PayloadAction<Order | null>) {
      state.completedOrder = action.payload;
    },
    resetCheckout() {
      return initialState;
    },
  },
});

export const {
  setStep,
  setSelectedAddress,
  setCustomAddress,
  setDeliverySlot,
  setDeliveryInstructions,
  setDeliveryNotes,
  setGuestContact,
  setPaymentMethod,
  setCouponCode,
  setIdempotencyKey,
  setPaymentStatus,
  setTermsAccepted,
  setCompletedOrder,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
