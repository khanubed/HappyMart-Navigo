import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthStatus } from '@workspace/typescript-config/types';

export type { User, AuthStatus };

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  status: AuthStatus;
  bootstrapped: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  status: 'idle',
  bootstrapped: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.status = 'authenticated';
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    loggedOut(state) {
      state.accessToken = null;
      state.user = null;
      state.status = 'guest';
    },
    bootstrapped(state) {
      state.bootstrapped = true;
    },
  },
});

export const { setToken, setUser, loggedOut, bootstrapped } = authSlice.actions;
export default authSlice.reducer;
