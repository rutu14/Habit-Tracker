import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const signupUser = createAsyncThunk(
    "users/signupUser",
    async ({ firstname, lastname, email, password }, thunkAPI) => {
      try {
        const { data } = await axios.post( '/api/auth/signup',{ email, password, firstname, lastname });
        localStorage.setItem("token", data.encodedToken);
        return data;
      } catch (e) {
        console.log("Error", e.response.data.errors[0]);
        return thunkAPI.rejectWithValue(e.response.data.errors[0]);
      }
    }
  )
  export const loginUser = createAsyncThunk(
    "users/login",
    async ({ email, password }, thunkAPI) => {
      try {
        const { data } = await axios.post( '/api/auth/login',{ email,password });
        localStorage.setItem("token", data.encodedToken);
        return data
      } catch (e) {
        console.log("Error", e.response.data.errors[0]);
        thunkAPI.rejectWithValue(e.response.data.errors[0]);
      }
    }
  )
const initialState= {
    user:{},
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  }
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut() {
        localStorage.removeItem("token");
        return { ...initialState }
    }
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.user = payload.createdUser;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;        
        state.user = payload.foundUser;
    },
    [loginUser.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
    },
    [loginUser.pending]: (state) => {
        state.isFetching = true;
    },
  },
})
export const { logOut }  = userSlice.actions;
export const userSelector = state => state.user