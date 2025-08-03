import { createSlice } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { loadOfferById, toggleFavorite } from './thunks/offer-thunks';

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
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (state.offer?.id === updatedOffer.id) {
          state.offer = { ...updatedOffer };
        }
        const nearbyIndex = state.nearbyOffers.findIndex(o => o.id === updatedOffer.id);
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex] = updatedOffer;
        }
      });
  },
});

export default currentOfferSlice.reducer;