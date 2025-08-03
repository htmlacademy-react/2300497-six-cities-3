import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { loadOffersFromServer, toggleFavorite } from './thunks/offer-thunks';
import { SortType } from './types/types';

const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    allOffers: [] as OfferTypes[],
    city: 'Paris',
    sortType: 'Popular',
    isLoading: true,
  },
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOffersFromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOffersFromServer.fulfilled, (state, action) => {
        state.allOffers = action.payload;
        state.isLoading = false;
      })
      .addCase(loadOffersFromServer.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        const allIndex = state.allOffers.findIndex((o) => o.id === updatedOffer.id);
        if (allIndex !== -1) {
          state.allOffers[allIndex] = updatedOffer;
        }
      });
  },
});

export const { changeCity, setSortType, setIsLoading } = offersSlice.actions;
export default offersSlice.reducer;
