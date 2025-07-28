import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types/types';
import { AuthorizationStatus } from '../const/const';
import { checkAuth } from './thunks/auth-thunks';
import { logout } from './thunks/auth-thunks';
import { login } from './thunks/auth-thunks';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null,
    authorizationStatus: AuthorizationStatus.Unknown,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const { setUser, setAuthorizationStatus } = userSlice.actions;
export default userSlice.reducer;
