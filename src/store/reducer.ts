import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { api } from '../api';
import { AuthorizationStatus } from '../const/const';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

type OffersState = {
  city: string;
  offers: OfferTypes[];
  allOffers: OfferTypes[];
  sortType: SortType;
  isLoading: boolean;
  error: string;
  user: {
    name: string;
    avatarUrl: string;
    email: string;
    token: string;
  } | null;
};

const initialState: OffersState = {
  city: 'Amsterdam',
  offers: [],
  allOffers: [],
  sortType: 'Popular',
  isLoading: false,
  error: '',
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

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/login');
      dispatch(setAuthorizationStatus('AUTH'));
      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus('NO_AUTH'));
      return rejectWithValue('Ошибка проверки авторизации');
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      dispatch(setAuthorizationStatus('AUTH'));
      dispatch(setUser(user));

      return response.data;
    } catch (error) {
      dispatch(setAuthorizationStatus('NO_AUTH'));
      return rejectWithValue('Неверный логин или пароль');
    }
  }
);


const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    city: 'Amsterdam',
    offers: [],
    allOffers: [],
    sortType: 'Popular',
    isLoading: false,
    error: null,
    authorizationStatus: 'UNKNOWN' as AuthorizationStatus,
    user: null,
  },
  reducers: {
    changeCity(state, action) {
      state.city = action.payload;
      state.offers = state.allOffers.filter(
        (offer) => offer.city.name === action.payload
      );
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
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
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  },
});



export const { changeCity, setSortType } =
  offersSlice.actions;

export default offersSlice.reducer;
