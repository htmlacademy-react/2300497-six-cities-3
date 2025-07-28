import { createSlice } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { loadOfferById } from './thunks/offer-thunks';

const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState: {
    offer: null as OfferTypes | null,
    nearbyOffers: [] as OfferTypes[],
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOfferById.pending, (state) => {
        state.status = 'loading';
        state.offer = null;
      })
      .addCase(loadOfferById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offer = action.payload.offer;
        state.nearbyOffers = action.payload.nearby;
      })
      .addCase(loadOfferById.rejected, (state) => {
        state.status = 'failed';
        state.offer = null;
      });
  },
});

export default currentOfferSlice.reducer;
