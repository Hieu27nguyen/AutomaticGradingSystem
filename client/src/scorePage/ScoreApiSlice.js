import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching scores
export const fetchScores = createAsyncThunk('scores/fetchScores', async () => {
  const response = await fetch('/api/scores');
  return response.json();
});

const scoresSlice = createSlice({
  name: 'scores',
  initialState: { scores: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchScores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchScores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.scores = action.payload;
      })
      .addCase(fetchScores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default scoresSlice.reducer;
