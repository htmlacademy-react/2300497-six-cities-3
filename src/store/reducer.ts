import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { AuthorizationStatus } from '../const/const';
import { saveToken } from '../services/token';
import { ReviewTypes } from '../mocks/offer';
import { SortType, User } from './types/types';
import { login, checkAuth, logout } from './thunks/auth-thunks';
import {
  loadOffersFromServer,
  loadOfferById,
  loadFavoritesFromServer,
  toggleFavorite,
} from './thunks/offer-thunks';
import { sendComment, loadCommentsById } from './thunks/comment-thunks';
import { api } from '../api';

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
  offerPageStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
};


export const initialState: OffersState = {
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
  offerPageStatus: 'idle',
};

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
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.authorizationStatus = AuthorizationStatus.Auth;
        saveToken(token);
        api.defaults.headers.common['X-Token'] = token;
        localStorage.setItem('user', JSON.stringify(user));
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
        state.favoriteOffers = [];
      })
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
        state.offerPageStatus = 'loading';
        state.isLoading = true;
        state.currentOffer = null;
      })
      .addCase(loadOfferById.fulfilled, (state, action) => {
        state.offerPageStatus = 'succeeded';
        state.isLoading = false;
        state.currentOffer = action.payload.offer;
        state.nearbyOffers = action.payload.nearby;
      })
      .addCase(loadOfferById.rejected, (state) => {
        state.offerPageStatus = 'failed';
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
        state.comments = action.payload.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        state.isLoading = false;
      })
      .addCase(loadCommentsById.rejected, (state) => {
        state.comments = [];
        state.isLoading = false;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
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
