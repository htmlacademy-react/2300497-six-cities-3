import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { OfferTypes } from '../mocks/offer';

export const selectFavoriteOffers = (state: RootState) => state.favoriteOffers;
export const selectUser = (state: RootState) => state.user;
export const selectAllOffers = (state: RootState) => state.allOffers;
export const selectCity = (state: RootState) => state.city;
export const selectSortType = (state: RootState) => state.sortType;

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
    (state: RootState) => state.currentOffer,
    (state: RootState) => state.nearbyOffers,
    (state: RootState) => state.isLoading,
  ],
  (currentOffer: OfferTypes | null, nearby: OfferTypes[], isLoading: boolean) => ({
    currentOffer,
    nearby,
    isLoading,
  })
);
