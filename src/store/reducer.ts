import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { api } from '../api';
import { AuthorizationStatus } from '../const/const';
import { saveToken } from '../services/token';
import { clearToken } from '../services/token';
import { AxiosInstance } from 'axios';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

type User = {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
};

export type OffersState = {
  city: string;
  offers: OfferTypes[];
  allOffers: OfferTypes[];
  sortType: SortType;
  isLoading: boolean;
  error: string | null;
  isCheckingAuth: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: OffersState = {
  city: 'Amsterdam',
  offers: [],
  allOffers: [],
  sortType: 'Popular',
  isLoading: false,
  error: null,
  isCheckingAuth: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const loadOffersFromServer = createAsyncThunk<OfferTypes[]>(
  'offers/loadOffersFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<OfferTypes[]>('/offers');
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки данных');
    }
  }
);

export const checkAuth = createAsyncThunk<
  UserData,
  void,
  { dispatch; extra: AxiosInstance }
>('user/checkAuth', async (_, { extra: api, dispatch }) => {
  try {
    const response = await api.get('/login');
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

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post('/login', { email, password });

      const token = response.headers['x-token'] || response.data.token;
      const user = response.data.user;

      if (token) {
        saveToken(token);
        api.defaults.headers.common['X-Token'] = token;
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUser(user));
      }

      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      return rejectWithValue('Неверный логин или пароль');
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    try {
      await api.delete('/logout');
    } catch (error) {
      console.error('Ошибка при выходе', error);
    } finally {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
      clearToken();
    }
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setIsCheckingAuth(state, action) {
      state.isCheckingAuth = action.payload;
    },
    changeCity(state, action) {
      state.city = action.payload;
      state.offers = state.allOffers.filter(
        (offer) => offer.city.name === action.payload
      );
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthorizationStatus(state, action) {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOffersFromServer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadOffersFromServer.fulfilled, (state, action) => {
        state.allOffers = action.payload;
        state.offers = action.payload.filter(
          (offer) => offer.city.name === state.city
        );
        state.isLoading = false;
      })
      .addCase(loadOffersFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  changeCity,
  setSortType,
  setAuthorizationStatus,
  setIsCheckingAuth,
  setUser,
} = offersSlice.actions;

export default offersSlice.reducer;
