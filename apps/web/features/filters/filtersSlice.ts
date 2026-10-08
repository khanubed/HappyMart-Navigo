import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DraftFilters {
  brand?: string[];
  country?: string[];
  minPrice?: number;
  maxPrice?: number;
  veg?: boolean;
  halal?: boolean;
  inStock?: boolean;
  offers?: boolean;
  sort?: string;
  [key: string]: any;
}

export interface FiltersState {
  draft: DraftFilters;
}

const initialState: FiltersState = {
  draft: {},
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDraftFilter(
      state,
      action: PayloadAction<{ key: string; value: any }>
    ) {
      state.draft[action.payload.key] = action.payload.value;
    },
    setAllDraftFilters(state, action: PayloadAction<DraftFilters>) {
      state.draft = action.payload;
    },
    resetDraftFilters(state) {
      state.draft = {};
    },
  },
});

export const { setDraftFilter, setAllDraftFilters, resetDraftFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
