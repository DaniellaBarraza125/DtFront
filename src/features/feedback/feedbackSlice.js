import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedbackService from "./feedbackService";

export const createFeedback = createAsyncThunk(
  "feedback/create",
  async (feedback, { rejectWithValue }) => {
      try {
          const response = await feedbackService.createFeedback(feedback);
          return response;
      } catch (error) {
          console.error(error);
          return rejectWithValue(error.response.data);
      }
  }
);

export const getById = createAsyncThunk(
  "feedback/getById",
  async (id, { rejectWithValue }) => {
      try {
          const response = await feedbackService.getById(id);
          return response;
      } catch (error) {
          console.error(error);
          return rejectWithValue(error.response.data);
      }
  },
);

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: { 
      feedbacks: [],
      status: null,
      error: null,
      feedbacksIsLoading: false, 
      feedback: null,
      feedbackIsLoading: false, 
  },
  reducers: {
      reset: (state) => {
          state.feedbacks = [];
          state.feedback = null;
          state.isLoading = true;
          state.error = null;
      },
  },
  extraReducers: (builder) => {
      builder
          .addCase(createFeedback.fulfilled, (state, action) => {
              state.feedbackIsLoading = false
              state.feedbacks = action.payload.feedback;
          })
          .addCase(createFeedback.pending, (state) => {
              state.status = "loading";
          })
          .addCase(createFeedback.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          })
          .addCase(getById.fulfilled, (state, action) => {
              state.isLoading = false;
              state.feedback = action.payload.feedback;
          })
          .addCase(getById.pending, (state) => {
              state.feedbackIsLoading = true;
              state.error = null;
          })
          .addCase(getById.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload || action.error.message;
          }) 
  },
});

export const { reset } = feedbackSlice.actions;
export default feedbackSlice.reducer;