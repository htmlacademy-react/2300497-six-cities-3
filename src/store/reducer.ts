import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { api } from '../api';
import { AuthorizationStatus } from '../const/const';
import { saveToken } from '../services/token';
import { clearToken } from '../services/token';
import { AxiosInstance } from 'axios';
import { ReviewTypes } from '../mocks/offer';
import { RootState } from '.';

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
  currentOffer: OfferTypes | null;
  nearbyOffers: OfferTypes[];
  favoriteOffers: [];
  comments: ReviewTypes[];
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  allOffers: [],
  sortType: 'Popular',
  isLoading: false,
  error: null,
  isCheckingAuth: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  nearbyOffers: [],
  favoriteOffers: [],
  comments: [],
};

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
      .addCase(loadOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload.offer;
        state.nearbyOffers = action.payload.nearby;
      })
      .addCase(loadOfferById.rejected, (state) => {
        state.currentOffer = null;
      })

      .addCase(loadFavoritesFromServer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadFavoritesFromServer.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isLoading = false;
      })
      .addCase(loadFavoritesFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

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
      .addCase(loadCommentsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadCommentsById.fulfilled, (state, action) => {
        console.log('Комментарии получены:', action.payload);
        state.comments = action.payload;
        console.log('comments записаны в стор:', state.comments);
        state.isLoading = false;
      })
      .addCase(loadCommentsById.rejected, (state) => {
        state.comments = [];
        state.isLoading = false;
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

export const loadFavoritesFromServer = createAsyncThunk<OfferTypes[]>(
  'offers/loadFavoritesFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<OfferTypes[]>('/favorite');
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки избранного');
    }
  }
);

export const checkAuth = createAsyncThunk<
  User,
  void,
  { dispatch; extra: AxiosInstance }
>('user/checkAuth', async (_, { dispatch }) => {
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

export const loadCommentsById = createAsyncThunk<
  ReviewTypes[],
  string,
  { extra: AxiosInstance }
>('offers/loadCommentsById', async (offerId, { extra: api }) => {
  try {
    const response = await api.get<ReviewTypes[]>(`/comments/${offerId}`);
    console.log('Комментарии получены:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке комментариев:', error);
    throw new Error('Не удалось загрузить комментарии');
  }
});

export const loadOfferById = createAsyncThunk<
  { offer: OfferTypes; nearby: OfferTypes[] },
  string,
  { extra: AxiosInstance }
>('offers/loadOfferById', async (offerId, { extra: api }) => {
  console.log('Fetching offer with ID:', offerId);
  try {
    const offerResponse = await api.get<OfferTypes>(`/offers/${offerId}`);
    const nearbyResponse = await api.get<OfferTypes[]>(
      `/offers/${offerId}/nearby`
    );

    console.log('Offer data:', offerResponse.data);
    console.log('Nearby offers:', nearbyResponse.data);

    return {
      offer: offerResponse.data,
      nearby: nearbyResponse.data,
    };
  } catch (error) {
    console.error('Ошибка при загрузке предложения:', error);
    throw new Error('Предложение не найдено');
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

export const selectComments = createSelector(
  [(state: RootState) => state.offers.comments],
  (comments) => comments || []
);

export default offersSlice.reducer;
