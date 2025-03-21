import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { verifyAuth } from '../thunk';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
