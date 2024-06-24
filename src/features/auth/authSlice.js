import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "./authService"


const token = localStorage.getItem("token") || ""
const user = JSON.parse(localStorage.getItem("user")) || null

const initialState = {
  user: user,
  token: token,
  isError: false,
  isSuccess: false,
  isLoading: true,
  msg: ""}



export const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.msg = ""
      state.isLoading = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.msg = action.payload.msg 
        state.isSuccess = true
        state.isLoading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.msg = action.payload
        state.isError = true
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = ""
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action)
        state.isSuccess = true
        state.msg = action.payload.msg
      })
      .addCase(register.rejected, (state, action) => {
        state.isSuccess = false
        state.isError = true
        state.msg = action.payload
      })
     
  }
})


export const register = createAsyncThunk(
  "auth/register", 
  async(user, thunkAPI)=>{
  try {
    return await authService.register(user)    
  } catch (error) {
    console.error(error)
    const msgError = error.response.data.msg
    return thunkAPI.rejectWithValue(msgError)
  }
})

export const login = createAsyncThunk("auth/login", async(user, thunkAPI)=>{
    try {
      return await authService.login(user)    
    } catch (error) {
      console.error(error)
      const msgError = error.response.data.msg
      return thunkAPI.rejectWithValue(msgError)
    }
  })

export const logout = createAsyncThunk("auth/logout", async()=>{
  try {
    return await authService.logout()    
  } catch (error) {
    console.error(error)
  }
})



export default authSlice.reducer

export const { reset } = authSlice.actions