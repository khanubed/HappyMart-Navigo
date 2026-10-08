import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  recentSearches: string[];
  isSuggestOpen: boolean;
}

const initialState: SearchState = {
  recentSearches: [],
  isSuggestOpen: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addRecentSearch(state, action: PayloadAction<string>) {
      const term = action.payload.trim();
      if (!term) return;
      state.recentSearches = [term, ...state.recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 8);
    },
    removeRecentSearch(state, action: PayloadAction<string>) {
      state.recentSearches = state.recentSearches.filter((s) => s !== action.payload);
    },
    clearRecentSearches(state) {
      state.recentSearches = [];
    },
    setIsSuggestOpen(state, action: PayloadAction<boolean>) {
      state.isSuggestOpen = action.payload;
    },
  },
});

export const {
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  setIsSuggestOpen,
} = searchSlice.actions;

export default searchSlice.reducer;
