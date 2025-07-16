import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { OfferTypes } from '../mocks/offer';

export const getCurrentOffer = (state: State) => state.currentOffer;
export const getNearbyOffers = (state: State) => state.nearbyOffers;

export const getOfferWithNearby = createSelector(
  [getCurrentOffer, getNearbyOffers],
  (currentOffer: OfferTypes | null, nearby: OfferTypes[]) => ({
    currentOffer,
    nearby,
  })
);
