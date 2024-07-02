import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import partnerService from "./partnerService";

export const getAllPartners = createAsyncThunk(
    "partner/getAllPartners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await partnerService.getAllPartners();
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const getPartnerById = createAsyncThunk(
    "partner/getPartnerById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await partnerService.getPartnerById(id);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const addPartner = createAsyncThunk(
    "partner/addPartner",
    async (partner, { rejectWithValue }) => {
        try {
            const response = await partnerService.addPartner(partner);
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

const initialState = {
    partners: [],
    partnersIsLoading: false,
    partner: null,
    partnerIsLoading: false,
    error: null,
};

export const partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {
        reset: (state) => {
            state.partners = [];
            state.partner = null;
            state.partnersIsLoading = false;
            state.partnerIsLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPartners.pending, (state) => {
                state.partnersIsLoading = true;
                state.error = null;
            })
            .addCase(getAllPartners.fulfilled, (state, action) => {
                state.partners = action.payload.partners;
                state.eventsIsLoading = false;
            })
            .addCase(getAllPartners.rejected, (state, action) => {
                state.eventsIsLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(getPartnerById.pending, (state) => {
                state.eventIsLoading = true;
                state.error = null;
            })
            .addCase(getPartnerById.fulfilled, (state, action) => {
                state.partner = action.payload.partner;
                state.eventIsLoading = false;
            })
            .addCase(getPartnerById.rejected, (state, action) => {
                state.eventIsLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(addPartner.pending, (state) => {
                state.eventIsLoading = true;
                state.error = null;
            })
            .addCase(addPartner.fulfilled, (state, action) => {
                state.partner = action.payload.partner;
                state.eventIsLoading = false;
            })
            .addCase(addPartner.rejected, (state, action) => {
                state.eventIsLoading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { reset } = partnerSlice.actions;
export default partnerSlice.reducer;
