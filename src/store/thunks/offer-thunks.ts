import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api';
import { OfferTypes } from '../../mocks/offer';
import { AxiosInstance } from 'axios';

export const toggleFavorite = createAsyncThunk<
  OfferTypes,
  { offerId: string; status: 0 | 1 },
  { extra: AxiosInstance }
>('offers/toggleFavorite', async ({ offerId, status }, { extra: axiosApi }) => {
  const response = await axiosApi.post<OfferTypes>(
    `/favorite/${offerId}/${status}`
  );
  return response.data;
});

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

export const loadFavoritesFromServer = createAsyncThunk<OfferTypes[]>(
  'offers/loadFavoritesFromServer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<OfferTypes[]>('/favorite');
      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка загрузки избранного');
    }
  }
);

export const loadOfferById = createAsyncThunk<
  { offer: OfferTypes; nearby: OfferTypes[] },
  string,
  { extra: AxiosInstance }
>('offers/loadOfferById', async (offerId, { extra: axiosApi }) => {
  try {
    const offerResponse = await axiosApi.get<OfferTypes>(`/offers/${offerId}`);
    const nearbyResponse = await axiosApi.get<OfferTypes[]>(
      `/offers/${offerId}/nearby`
    );

    return {
      offer: offerResponse.data,
      nearby: nearbyResponse.data,
    };
  } catch (error) {
    throw new Error('Предложение не найдено');
  }
});
