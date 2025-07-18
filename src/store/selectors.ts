import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { OfferTypes } from '../mocks/offer';

export const getCurrentOffer = (state: State) => state.currentOffer;
export const getNearbyOffers = (state: State) => state.nearbyOffers;
export const getIsLoading = (state: State) => state.isLoading;

export const getOfferWithNearby = createSelector(
  [
    (state: State) => state.currentOffer,
    (state: State) => state.nearbyOffers,
    (state: State) => state.isLoading,
  ],
  (
    currentOffer: OfferTypes | null,
    nearby: OfferTypes[],
    isLoading: boolean
  ) => ({
    currentOffer,
    nearby,
    isLoading,
  })
);
