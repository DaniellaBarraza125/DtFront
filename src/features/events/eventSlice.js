import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "./eventService";

export const getAll = createAsyncThunk(
    "event/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await eventService.getAll();
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const getById = createAsyncThunk(
    "event/getById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await eventService.getById(id);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const getByDate = createAsyncThunk(
    "event/getByDate",
    async (date, { rejectWithValue }) => {
        try {
            console.log(date);
            const response = await eventService.getByDate(date);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

const initialState = {
    events: [],
    eventsIsLoading: false,
    event: null,
    eventIsLoading: false,
    error: null,
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        reset: (state) => {
            state.events = [];
            state.event = null;
            state.eventsIsLoading = false;
            state.eventIsLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.eventsIsLoading = true;
                state.error = null;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.events = action.payload.events;
                state.eventsIsLoading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.eventsIsLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(getById.pending, (state) => {
                state.eventIsLoading = true;
                state.error = null;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.event = action.payload.event;
                state.eventIsLoading = false;
            })
            .addCase(getById.rejected, (state, action) => {
                state.eventIsLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(getByDate.pending, (state) => {
                state.eventsIsLoading = true;
                state.error = null;
            })
            .addCase(getByDate.fulfilled, (state, action) => {
                state.events = action.payload.events;
                state.eventsIsLoading = false;
            })
            .addCase(getByDate.rejected, (state, action) => {
                state.eventsIsLoading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
