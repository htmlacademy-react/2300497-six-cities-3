import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { OfferTypes } from '../mocks/offer';

export const getCurrentOffer = (state: RootState) => state.currentOffer;
export const getNearbyOffers = (state: RootState) => state.nearbyOffers;
export const getIsLoading = (state: RootState) => state.isLoading;

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