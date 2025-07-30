import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { loadOffersFromServer } from './thunks/offer-thunks';
import { SortType } from './types/types';

const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    allOffers: [] as OfferTypes[],
    city: 'Paris',
    sortType: 'Popular' as const,
  },
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOffersFromServer.fulfilled, (state, action) => {
        state.allOffers = action.payload;
      });
  },
});

export const { changeCity, setSortType } = offersSlice.actions;
export default offersSlice.reducer;
