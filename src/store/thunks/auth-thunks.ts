import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import { saveToken } from '../../services/token';
import { User, LoginResponse } from '../types/types';
import { AxiosInstance } from 'axios';
import { AppDispatch } from '..';
import { setAuthorizationStatus, setUser, setIsCheckingAuth } from '../user-slice';
import { clearToken } from '../../services/token';
import { AuthorizationStatus } from '../../const/const';
import { loadFavoritesFromServer } from './offer-thunks';

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post<LoginResponse>('/login', {
        email,
        password,
      });

      const { token, name, email: userEmail, avatarUrl } = response.data;

      const user = { name, email: userEmail, avatarUrl, token };

      if (token) {
        saveToken(token);
        api.defaults.headers.common['X-Token'] = token;
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUser(user));
        dispatch(loadFavoritesFromServer());
      }

      return { token, user };
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      return rejectWithValue('Неверный логин или пароль');
    }
  }
);

export const checkAuth = createAsyncThunk<
  User,
  void,
  { dispatch: AppDispatch; extra: AxiosInstance }
>('user/checkAuth', async (_, { dispatch }) => {
  try {
    const response = await api.get<User>('/login');
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(response.data));
    return response.data;
  } catch (error) {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    throw error;
  } finally {
    dispatch(setIsCheckingAuth(false));
  }
});

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    try {
      await api.delete('/logout');
    } catch (error) {
      throw new Error('Ошибка при выходе');
    } finally {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
      clearToken();
    }
  }
);
