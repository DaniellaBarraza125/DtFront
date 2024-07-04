import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (_,{rejectWithValue}) => {
        try {
        const response = await productService.getAllProducts();
        return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
        
    }
);


const initialState = {
    products: [],
    isLoading: true,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) => {
            state.products = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
