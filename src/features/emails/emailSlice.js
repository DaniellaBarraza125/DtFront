import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailService from "./emailService";

export const sendSummary = createAsyncThunk(
    "partner/sendSummary",
    async (_, { rejectWithValue }) => {
        try {
            const response = await emailService.sendSummary();
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);


const initialState = {
    email: null,
    isLoading: true,
    error: null,

};

export const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {
        reset: (state) => {
            state.email = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendSummary.pending, (state) => {
                state.partnersIsLoading = true;
                state.error = null;
            })
            .addCase(sendSummary.fulfilled, (state, action) => {
                state.partners = action.payload.partners;
                state.isLoading = false;
            })
            .addCase(sendSummary.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export const { reset } = emailSlice.actions;
export default emailSlice.reducer;
