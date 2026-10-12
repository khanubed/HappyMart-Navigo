import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode, ThemeId } from '@workspace/typescript-config/types';

export type { ThemeMode, ThemeId };

export interface ThemeState {
  mode: ThemeMode;
  themeId: ThemeId;
}

const initialState: ThemeState = {
  mode: 'light',
  themeId: 'fresh-market',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
    setThemeId(state, action: PayloadAction<ThemeId>) {
      state.themeId = action.payload;
    },
  },
});

export const { setThemeMode, setThemeId } = themeSlice.actions;
export default themeSlice.reducer;
