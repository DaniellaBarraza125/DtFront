import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const token = localStorage.getItem("token") || "";
const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
    user: user,
    token: token,
    isError: false,
    isSuccess: false,
    isLoading: false,
    users: [],
    msg: "",
};

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            console.error(error);
            const msgError = error.response.data.msg;
            return thunkAPI.rejectWithValue(msgError);
        }
    },
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        const response = await authService.login(user);

        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        return response;
    } catch (error) {
        console.error(error);
        const msgError = error.response.data.msg;
        return thunkAPI.rejectWithValue(msgError);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        await authService.logout();

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    } catch (error) {
        console.error(error);
    }
});

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
    try {
        return await authService.getUsers();
    } catch (error) {
        console.error(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.msg = "";
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.msg = action.payload.msg;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.msg = action.payload;
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = "";
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.msg = action.payload.msg;
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.msg = action.payload;
                state.isLoading = false;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
