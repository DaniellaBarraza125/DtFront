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
export const sendto = createAsyncThunk(
    "partner/sendto",
    async (_, { rejectWithValue }) => {
        try {
            const response = await emailService.sendto();
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

const initialState = {
    msg: "",
    isLoading: true,
    error: false,
    isSuccess: false,
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
                state.isLoading = true;
                state.error = false;
            })
            .addCase(sendSummary.fulfilled, (state, action) => {
                state.isSuccess = action.payload.partners;
                state.isLoading = false;
            })
            .addCase(sendSummary.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { reset } = emailSlice.actions;
export default emailSlice.reducer;
