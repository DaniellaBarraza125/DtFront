import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "./eventService";

export const getAll = createAsyncThunk("event/getAll", async () => {
    try {
        return await eventService.getAll();
    } catch (error) {
        console.error(error);
        throw error;
    }
});
export const getById = createAsyncThunk(
    "event/getById",
    async (id, { rejectWithValue }) => {
        try {
            return await eventService.getById(id);
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
                state.error = action.error.message;
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
                state.error = action.error.message;
            });
    },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
