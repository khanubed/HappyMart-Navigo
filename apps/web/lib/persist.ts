import { isAnyOf, type ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { addRecentSearch, removeRecentSearch, clearRecentSearches } from '@/features/search/searchSlice';
import { setThemeMode } from '@/features/ui/themeSlice';
import { setLanguage } from '@/features/ui/localeSlice';
import { dismissAnnouncement, setCookieConsent } from '@/features/ui/uiSlice';
import {
  setStep,
  setSelectedAddress,
  setDeliverySlot,
  setDeliveryNotes,
  setGuestContact,
  setCouponCode,
  setIdempotencyKey,
  setPaymentStatus,
  resetCheckout,
} from '@/features/checkout/checkoutSlice';

const THEME_KEY = 'happymart_theme';
const LOCALE_KEY = 'happymart_locale';
const SEARCH_KEY = 'happymart_recent_searches';
const UI_PREFS_KEY = 'happymart_ui_prefs';
const CHECKOUT_KEY = 'happymart_checkout_draft';

export function loadPersisted(): Record<string, any> {
  if (typeof window === 'undefined') {
    return {};
  }

  const preloaded: Record<string, any> = {};

  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      preloaded.theme = { mode: savedTheme };
    }

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
  } catch (err) {
    console.warn('Failed to load persisted Redux state:', err);
  }

  return preloaded;
}

export function persistListeners(listener: ListenerMiddlewareInstance) {
  // Persist Theme changes
  listener.startListening({
    actionCreator: setThemeMode,
    effect: (action) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(THEME_KEY, action.payload);
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
      setDeliverySlot,
      setDeliveryNotes,
      setGuestContact,
      setCouponCode,
      setIdempotencyKey,
      setPaymentStatus,
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
}
