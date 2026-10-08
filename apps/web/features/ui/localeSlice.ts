import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { LanguageLocale } from '@workspace/typescript-config/types';

export type { LanguageLocale };

export interface LocaleState {
  language: LanguageLocale;
}

const initialState: LocaleState = {
  language: 'en',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageLocale>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = localeSlice.actions;
export default localeSlice.reducer;
