import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { OfferTypes } from '../mocks/offer';

export const selectFavoriteOffers = (state: RootState) => state.favorites;
export const selectUser = (state: RootState) => state.user.user;
export const selectAllOffers = (state: RootState) => state.offers.allOffers;
export const selectCity = (state: RootState) => state.offers.city;
export const selectSortType = (state: RootState) => state.offers.sortType;
export const selectIsCheckingAuth = (state: RootState) => state.user.isCheckingAuth;
export const selectOffersLoading = (state: RootState) => state.offers.isLoading;

export const selectCurrentOffers = createSelector(
  [selectAllOffers, selectCity, selectSortType],
  (allOffers, city, sortType) => {
    const filtered = allOffers.filter((offer) => offer.city.name === city);

    return filtered.sort((a, b) => {
      switch (sortType) {
        case 'Price: low to high':
          return a.price - b.price;
        case 'Price: high to low':
          return b.price - a.price;
        case 'Top rated first':
          return b.rating - a.rating;
        case 'Popular':
        default:
          return 0;
      }
    });
  }
);

export const selectIsAuthorized = createSelector(
  [selectUser],
  (user) => Boolean(user)
);

export const selectRecentComments = createSelector(
  [(state: RootState) => state.comments],
  (comments) => [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
);

export const getOfferWithNearby = createSelector(
  [
    (state: RootState) => state.currentOffer.offer,
    (state: RootState) => state.currentOffer.nearbyOffers,
    (state: RootState) => state.currentOffer.status === 'loading',
  ],
  (currentOffer: OfferTypes | null, nearby: OfferTypes[], isLoading: boolean) => ({
    currentOffer,
    nearby,
    isLoading,
  })
);
