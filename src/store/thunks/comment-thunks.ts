import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewTypes } from '../../mocks/offer';
import { AxiosInstance } from 'axios';
import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const loadCommentsById = createAsyncThunk<
  ReviewTypes[],
  string,
  { extra: AxiosInstance }
>('offers/loadCommentsById', async (offerId, { extra: api }) => {
  try {
    const response = await api.get<ReviewTypes[]>(`/comments/${offerId}`);
    return response.data;
  } catch (error) {
    throw new Error('Не удалось загрузить комментарии');
  }
});

export const sendComment = createAsyncThunk<
  ReviewTypes,
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>(
  'offers/sendComment',
  async (
    { offerId, comment, rating },
    { extra: api, rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post<ReviewTypes>(
        `/comments/${offerId}`,
        {
          comment,
          rating,
        }
      );

      dispatch(loadCommentsById(offerId));

      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при отправке комментария');
    }
  }
);

export const selectComments = createSelector(
  [(state: RootState) => state.comments],
  (comments) => comments || []
);
