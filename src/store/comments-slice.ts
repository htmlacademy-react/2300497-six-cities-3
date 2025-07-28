import { createSlice } from '@reduxjs/toolkit';
import { ReviewTypes } from '../mocks/offer';
import { loadCommentsById, sendComment } from './thunks/comment-thunks';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [] as ReviewTypes[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsById.fulfilled, (_state, action) => action.payload.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ))
      .addCase(sendComment.fulfilled, (state, action) => {
        state.unshift(action.payload);
      });
  },
});

export default commentsSlice.reducer;
