import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction
} from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { api } from '../api';
import { AuthorizationStatus } from '../const/const';
import { saveToken } from '../services/token';
import { clearToken } from '../services/token';
import { AxiosInstance } from 'axios';
import { ReviewTypes } from '../mocks/offer';
import { AppDispatch, RootState } from '.';

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
  favoriteOffers: OfferTypes[];
  comments: ReviewTypes[];
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  allOffers: [],
  sortType: 'Popular',
  isLoading: true,
  error: null,
  isCheckingAuth: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  nearbyOffers: [],
  favoriteOffers: [],
  comments: [],
};

export const toggleFavorite = createAsyncThunk<
  OfferTypes,
  { offerId: string; status: 0 | 1 },
  { extra: AxiosInstance }
>('offers/toggleFavorite', async ({ offerId, status }, { extra: axiosApi }) => {
  const response = await axiosApi.post<OfferTypes>(`/favorite/${offerId}/${status}`);
  return response.data;
});

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

export const loadCommentsById = createAsyncThunk<
  ReviewTypes[],
  string,
  { extra: AxiosInstance }
>('offers/loadCommentsById', async (offerId, { extra: axiosApi }) => {
  try {
    const response = await axiosApi.get<ReviewTypes[]>(`/comments/${offerId}`);
    return response.data;
  } catch (error) {
    throw new Error('Не удалось загрузить комментарии');
  }
});

export const sendComment = createAsyncThunk<
  ReviewTypes,
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>(
  'offers/sendComment',
  async (
    { offerId, comment, rating },
    { extra: axiosApi, rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axiosApi.post<ReviewTypes>(`/comments/${offerId}`, {
        comment,
        rating,
      });

      dispatch(loadCommentsById(offerId));

      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при отправке комментария');
    }
  }
);

export const loadOfferById = createAsyncThunk<
  { offer: OfferTypes; nearby: OfferTypes[] },
  string,
  { extra: AxiosInstance }
>('offers/loadOfferById', async (offerId, { extra: axiosApi }) => {
  try {
    const offerResponse = await axiosApi.get<OfferTypes>(`/offers/${offerId}`);
    const nearbyResponse = await axiosApi.get<OfferTypes[]>(
      `/offers/${offerId}/nearby`
    );

    return {
      offer: offerResponse.data,
      nearby: nearbyResponse.data,
    };
  } catch (error) {
    throw new Error('Предложение не найдено');
  }
});

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setIsCheckingAuth(state, action: PayloadAction<boolean>) {
      state.isCheckingAuth = action.payload;
    },
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
      state.offers = state.allOffers.filter(
        (offer) => offer.city.name === action.payload
      );
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (state.currentOffer?.id === updatedOffer.id) {
          state.currentOffer = { ...updatedOffer };
        }

        const allIndex = state.allOffers.findIndex(
          (o) => o.id === updatedOffer.id
        );
        if (allIndex !== -1) {
          state.allOffers[allIndex] = updatedOffer;
        }

        const offersIndex = state.offers.findIndex(
          (o) => o.id === updatedOffer.id
        );
        if (offersIndex !== -1) {
          state.offers[offersIndex] = updatedOffer;
        }

        const nearbyIndex = state.nearbyOffers.findIndex(
          (o) => o.id === updatedOffer.id
        );
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex] = updatedOffer;
        }
      })
      .addCase(loadOfferById.pending, (state) => {
        state.isLoading = true;
        state.currentOffer = null;
      })
      .addCase(loadOfferById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOffer = action.payload.offer;
        state.nearbyOffers = action.payload.nearby;
      })
      .addCase(loadOfferById.rejected, (state) => {
        state.isLoading = false;
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
        state.comments = action.payload;
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

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post<{ token: string; user: User }>(
        '/login',
        { email, password }
      );

      const token = response.data.token;
      const user = response.data.user;

      if (token) {
        saveToken(token);
        api.defaults.headers.common['X-Token'] = token;
        dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
        dispatch(setUser(user));
      }

      return { token, user };
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
      throw new Error('Ошибка при выходе');
    } finally {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
      clearToken();
    }
  }
);

export const selectComments = createSelector(
  [(state: RootState) => state.comments],
  (comments) => comments || []
);

export default offersSlice.reducer;
