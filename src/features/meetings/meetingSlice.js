import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import meetingService from "./meetingService";

const initialState = {
    meetings: [],
    meeting: null,
    isError: false,
    isSuccess: false,
    isLoading: true,
    msg: "",
};

export const getMeetingByUser = createAsyncThunk(
    "meeting/getMeetingByUser",
    async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage");
            }
            return await meetingService.getMeetingByUser(token);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
);
export const createMeeting = createAsyncThunk(
    "meeting/createMeeting",
    async (formData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage");
            }
            return await meetingService.createMeeting(formData);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
);

export const meetingSlice = createSlice({
    name: "meeting",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = true;
            state.msg = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMeetingByUser.fulfilled, (state, action) => {
                state.meetings = action.payload.meetings;
                state.msg = action.payload.msg;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(getMeetingByUser.rejected, (state, action) => {
                state.msg = action.payload;
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(getMeetingByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMeeting.fulfilled, (state, action) => {
                state.meeting = action.payload.meeting;
                state.msg = action.payload.msg;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(createMeeting.rejected, (state, action) => {
                state.msg = action.payload;
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(createMeeting.pending, (state) => {
                state.isLoading = true;
            });
    },
});

export const { reset } = meetingSlice.actions;
export default meetingSlice.reducer;
