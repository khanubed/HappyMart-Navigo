import { isAnyOf, type ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { addRecentSearch, removeRecentSearch, clearRecentSearches } from '@/features/search/searchSlice';
import { setThemeMode, setThemeId } from '@/features/ui/themeSlice';
import { isValidThemeId, DEFAULT_THEME_ID } from '@/config/themes';
import { setLanguage } from '@/features/ui/localeSlice';
import { dismissAnnouncement, setCookieConsent } from '@/features/ui/uiSlice';
import {
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
  resetCheckout,
} from '@/features/checkout/checkoutSlice';
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  undoRemove,
  saveForLater,
  moveToCart,
  removeSavedItem,
  applyCoupon,
  removeCoupon,
  clearCart,
} from '@/features/cart/cartSlice';

const THEME_KEY = 'happymart_theme';
const THEME_MODE_KEY = 'happymart_theme_mode';
const THEME_ID_KEY = 'happymart_theme_id';
const LOCALE_KEY = 'happymart_locale';
const SEARCH_KEY = 'happymart_recent_searches';
const UI_PREFS_KEY = 'happymart_ui_prefs';
const CHECKOUT_KEY = 'happymart_checkout_draft';
const CART_KEY = 'happymart_cart_data';

export function loadPersisted(): Record<string, any> {
  if (typeof window === 'undefined') {
    return {};
  }

  const preloaded: Record<string, any> = {};

  try {
    const savedThemeMode = localStorage.getItem(THEME_MODE_KEY) || localStorage.getItem(THEME_KEY);
    const mode = savedThemeMode && ['light', 'dark', 'system'].includes(savedThemeMode)
      ? savedThemeMode
      : 'light';

    const savedThemeId = localStorage.getItem(THEME_ID_KEY);
    const themeId = isValidThemeId(savedThemeId) ? savedThemeId : DEFAULT_THEME_ID;

    preloaded.theme = { mode, themeId };

    const savedLocale = localStorage.getItem(LOCALE_KEY);
    if (savedLocale && ['en', 'zh-HK'].includes(savedLocale)) {
      preloaded.locale = { language: savedLocale };
    }

    const savedSearches = localStorage.getItem(SEARCH_KEY);
    if (savedSearches) {
      preloaded.search = {
        recentSearches: JSON.parse(savedSearches),
        isSuggestOpen: false,
      };
    }

    const savedUi = localStorage.getItem(UI_PREFS_KEY);
    if (savedUi) {
      const parsed = JSON.parse(savedUi);
      preloaded.ui = {
        isMobileMenuOpen: false,
        isAuthModalOpen: false,
        authModalView: 'login',
        isFilterSheetOpen: false,
        announcementDismissedId: parsed.announcementDismissedId ?? null,
        cookieConsent: parsed.cookieConsent ?? null,
      };
    }

    const savedCheckout = sessionStorage.getItem(CHECKOUT_KEY);
    if (savedCheckout) {
      preloaded.checkout = JSON.parse(savedCheckout);
    }

    const savedCart = localStorage.getItem(CART_KEY);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      preloaded.cart = {
        items: parsedCart.items ?? [],
        savedItems: parsedCart.savedItems ?? [],
        appliedCoupon: parsedCart.appliedCoupon ?? null,
        pendingItemIds: [],
        lastAddedItemId: null,
        lastRemovedItem: null,
        isDrawerOpen: false,
        notification: null,
      };
    }
  } catch (err) {
    console.warn('Failed to load persisted Redux state:', err);
  }

  return preloaded;
}

export function persistListeners(listener: ListenerMiddlewareInstance) {
  // Persist Theme Mode changes
  listener.startListening({
    actionCreator: setThemeMode,
    effect: (action) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(THEME_MODE_KEY, action.payload);
          localStorage.setItem(THEME_KEY, action.payload);
        } catch { }
      }
    },
  });

  // Persist Theme Template changes
  listener.startListening({
    actionCreator: setThemeId,
    effect: (action) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(THEME_ID_KEY, action.payload);
          document.documentElement.setAttribute('data-theme', action.payload);
        } catch { }
      }
    },
  });

  // Persist Locale changes
  listener.startListening({
    actionCreator: setLanguage,
    effect: (action) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(LOCALE_KEY, action.payload);
        } catch { }
      }
    },
  });

  // Persist Recent Searches
  listener.startListening({
    matcher: isAnyOf(addRecentSearch, removeRecentSearch, clearRecentSearches),
    effect: (_, api) => {
      if (typeof window !== 'undefined') {
        try {
          const state = api.getState() as any;
          localStorage.setItem(
            SEARCH_KEY,
            JSON.stringify(state.search.recentSearches)
          );
        } catch { }
      }
    },
  });

  // Persist UI preferences (dismissed banner, cookie consent)
  listener.startListening({
    matcher: isAnyOf(dismissAnnouncement, setCookieConsent),
    effect: (_, api) => {
      if (typeof window !== 'undefined') {
        try {
          const state = api.getState() as any;
          const prefs = {
            announcementDismissedId: state.ui.announcementDismissedId,
            cookieConsent: state.ui.cookieConsent,
          };
          localStorage.setItem(UI_PREFS_KEY, JSON.stringify(prefs));
        } catch { }
      }
    },
  });

  // Persist Checkout draft in sessionStorage
  listener.startListening({
    matcher: isAnyOf(
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
      resetCheckout
    ),
    effect: (_, api) => {
      if (typeof window !== 'undefined') {
        try {
          const state = api.getState() as any;
          sessionStorage.setItem(
            CHECKOUT_KEY,
            JSON.stringify(state.checkout)
          );
        } catch { }
      }
    },
  });

  // Persist Cart in localStorage
  listener.startListening({
    matcher: isAnyOf(
      addToCart,
      updateQuantity,
      removeFromCart,
      undoRemove,
      saveForLater,
      moveToCart,
      removeSavedItem,
      applyCoupon,
      removeCoupon,
      clearCart
    ),
    effect: (_, api) => {
      if (typeof window !== 'undefined') {
        try {
          const state = api.getState() as any;
          const cartData = {
            items: state.cart.items,
            savedItems: state.cart.savedItems,
            appliedCoupon: state.cart.appliedCoupon,
          };
          localStorage.setItem(CART_KEY, JSON.stringify(cartData));
        } catch { }
      }
    },
  });
}
