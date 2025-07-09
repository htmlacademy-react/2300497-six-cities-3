import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferTypes } from '../mocks/offer';
import api from '../api';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

type OffersState = {
  city: string;
  offers: OfferTypes[];
  allOffers: OfferTypes[];
  sortType: SortType;
  isLoading: boolean;
  error: string | null;
};

const initialState: OffersState = {
  city: 'Amsterdam',
  offers: [],
  allOffers: [],
  sortType: 'Popular',
  isLoading: false,
  error: null,
};

export const loadOffersFromServer = createAsyncThunk<OfferTypes[]>(
  'offers/loadOffersFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<OfferTypes[]>('/offers');
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки данных');
    }
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity(state, action) {
      state.city = action.payload;
      state.offers = state.allOffers.filter(
        (offer) => offer.city.name === action.payload
      );
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOffersFromServer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadOffersFromServer.fulfilled, (state, action) => {
        state.allOffers = action.payload;
        state.offers = action.payload.filter((offer) => offer.city.name === state.city);
        state.isLoading = false;
      })
      .addCase(loadOffersFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});


export const { changeCity, setSortType } =
  offersSlice.actions;

export default offersSlice.reducer;
