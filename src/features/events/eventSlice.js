import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventService from "./eventService";

export const createEvent = createAsyncThunk(
    "event/create",
    async (event, { rejectWithValue }) => {
        try {
            const response = await eventService.createEvent(event);
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
        try {
            const response = await eventService.getByDate(date);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);
 export const subscribeEvent = createAsyncThunk(
    "event/subscribe",
    async (eventId, { rejectWithValue }) => {
        try {
            const response = await eventService.subscribeEvent(eventId);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const unsubscribeEvent = createAsyncThunk(
    "event/unsubscribe",
    async (eventId, { rejectWithValue }) => {
        try {
            const response = await eventService.unsubscribeEvent(eventId);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const getBySala = createAsyncThunk(
    "event/getBySala",
    async (sala, { rejectWithValue }) => {
        try {
            const response = await eventService.getBySala(sala);
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
    initialState: { 
        events: [],
        status: null,
        error: null,
        eventsIsLoading: false, //---------------
        event: null,
        eventIsLoading: false, //---------------
    },
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
            
            .addCase(getAll.fulfilled, (state, action) => {
                state.events = action.payload.events;
                state.isLoading = false;
            })
            .addCase(getAll.pending, (state) => {
                state.eventsIsLoading = true;
                state.error = null;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.event = action.payload.event;
            })
            .addCase(getById.pending, (state) => {
                state.eventIsLoading = true;
                state.error = null;
            })
            .addCase(getById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;//----------------
            })
            .addCase(getByDate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = action.payload.events;
            })
            .addCase(getByDate.pending, (state) => {
                state.eventsIsLoading = true;
                state.error = null;
            })
            .addCase(getByDate.rejected, (state, action) => {
                state.eventsIsLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.eventIsLoading = false
                state.events = action.payload.event;
            })
            .addCase(createEvent.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createEvent.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            })
            .addCase(subscribeEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.event = action.payload.event;
            })
            .addCase(subscribeEvent.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(subscribeEvent.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            .addCase(unsubscribeEvent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.event = action.payload.event;
            })
            .addCase(unsubscribeEvent.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(unsubscribeEvent.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            .addCase(getBySala.fulfilled, (state, action) => {
                state.isLoading = false;
                state.events = action.payload.events;
            })
            .addCase(getBySala.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBySala.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
    },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
