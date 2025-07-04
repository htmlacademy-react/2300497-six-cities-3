import { createSlice } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type OffersState = {
  city: string;
  offers: OfferTypes[];
  sortType: SortType;
};

const initialState: OffersState = {
  city: 'Amsterdam',
  offers: [],
  sortType: 'Popular',
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action) {
      state.city = action.payload;
    },
    loadOffers(state, action) {
      state.offers = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const { changeCity, loadOffers, setSortType } = offersSlice.actions;

export default offersSlice.reducer;
