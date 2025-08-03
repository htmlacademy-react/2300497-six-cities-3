import { createSlice } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { loadFavoritesFromServer, toggleFavorite } from './thunks/offer-thunks';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as OfferTypes[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoritesFromServer.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (updatedOffer.isFavorite) {
          if (!state.some(o => o.id === updatedOffer.id)) {
            state.push(updatedOffer);
          }
        } else {
          return state.filter(o => o.id !== updatedOffer.id);
        }
      });
  },
});

export default favoritesSlice.reducer;
