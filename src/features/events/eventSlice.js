import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "./eventService";

export const createEvent = createAsyncThunk(
    "event/create",
    async (_, { rejectWithValue }) => {
        try {
            const response = await eventService.createEvent();
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const getAll = createAsyncThunk(
    "event/getAll",
    async (_, { rejectWithValue }) => {
        console.log("getAll");
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
        console.log('getByDate',date);
        try {
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
    isLoading: true,
    event: null,
    error: null,
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        reset: (state) => {
            state.events = [];
            state.event = null;
            state.isLoading = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {//-------------------orden
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.events = action.payload.events;
                state.isLoading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(getById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.event = action.payload.event;
            })
            .addCase(getById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;//----------------
            })
            .addCase(getByDate.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = action.payload.events;
            })
            .addCase(getByDate.rejected, (state, action) => {
                state.eventsIsLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.events = action.payload.events;
            })
    },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
