import { createSlice } from '@reduxjs/toolkit';
import { fetchInstructorSentiment } from '../actions';

const initialState = {
  sentiments: [],
  status: 'idle', 
  error: null,
};

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorSentiment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInstructorSentiment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.sentiments.findIndex(instructor => instructor.id === action.payload.id);
        if (index !== -1) {
          state.sentiments[index] = action.payload; 
        } else {
          state.sentiments.push(action.payload); 
        }
      })
      .addCase(fetchInstructorSentiment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default instructorSlice.reducer;
