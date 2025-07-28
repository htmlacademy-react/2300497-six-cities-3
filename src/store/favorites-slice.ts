import { createSlice } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { loadFavoritesFromServer, toggleFavorite } from './thunks/offer-thunks';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as OfferTypes[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoritesFromServer.fulfilled, (state, action) => action.payload)
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const offer = action.payload;
        const index = state.findIndex((o) => o.id === offer.id);
        if (index !== -1 && !offer.isFavorite) {
          state.splice(index, 1);
        } else if (index === -1 && offer.isFavorite) {
          state.push(offer);
        }
      });
  },
});

export default favoritesSlice.reducer;
