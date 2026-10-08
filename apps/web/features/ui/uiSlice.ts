import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthModalView = 'login' | 'signup' | 'otp';

export interface UIState {
  isMobileMenuOpen: boolean;
  isAuthModalOpen: boolean;
  authModalView: AuthModalView;
  isFilterSheetOpen: boolean;
  announcementDismissedId: string | null;
  cookieConsent: boolean | null;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isAuthModalOpen: false,
  authModalView: 'login',
  isFilterSheetOpen: false,
  announcementDismissedId: null,
  cookieConsent: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMobileMenuOpen = action.payload;
    },
    openAuthModal(state, action: PayloadAction<AuthModalView | undefined>) {
      state.isAuthModalOpen = true;
      if (action.payload) {
        state.authModalView = action.payload;
      }
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    },
    setAuthModalView(state, action: PayloadAction<AuthModalView>) {
      state.authModalView = action.payload;
    },
    toggleFilterSheet(state) {
      state.isFilterSheetOpen = !state.isFilterSheetOpen;
    },
    setFilterSheetOpen(state, action: PayloadAction<boolean>) {
      state.isFilterSheetOpen = action.payload;
    },
    dismissAnnouncement(state, action: PayloadAction<string>) {
      state.announcementDismissedId = action.payload;
    },
    setCookieConsent(state, action: PayloadAction<boolean>) {
      state.cookieConsent = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  openAuthModal,
  closeAuthModal,
  setAuthModalView,
  toggleFilterSheet,
  setFilterSheetOpen,
  dismissAnnouncement,
  setCookieConsent,
} = uiSlice.actions;

export default uiSlice.reducer;
