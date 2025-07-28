import { createSlice } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import { loadOffersFromServer } from './thunks/offer-thunks';

const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    allOffers: [] as OfferTypes[],
    city: 'Paris',
    sortType: 'Popular' as const,
  },
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    setSortType: (state, action) => {
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
