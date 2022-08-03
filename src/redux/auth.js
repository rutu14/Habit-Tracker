import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { capitializeString, errorMessage } from "../utils";

export const signupUser = createAsyncThunk(
    "users/signupUser",
    async ({ signupInputs, toast },thunkAPI) => {
      try {
        const { email, password, firstName, lastName } = signupInputs;
        const { data } = await axios.post( '/api/auth/signup',{ email, password, firstName, lastName });
        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("avatarName", data.createdUser.firstName.charAt(0).toUpperCase() + ' ' + data.createdUser.lastName.charAt(0).toUpperCase());
        localStorage.setItem("userName", capitializeString(data.createdUser.firstName));
        return data;
      } catch (e) {
        const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
        toast({
            title: errorTitle ,
            status: 'error',
            variant:'left-accent',
            isClosable: true,
        });
        return thunkAPI.rejectWithValue(e.response.data.errors[0]);
      }
    }
)
  
export const loginUser = createAsyncThunk(
    "users/login",
    async ({ loginInputs,toast },thunkAPI) => {
      try {
        const { email, password } = loginInputs;
        const { data } = await axios.post( '/api/auth/login',{ email, password });
        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("avatarName", data.foundUser.firstName.charAt(0).toUpperCase() + ' ' + data.foundUser.lastName.charAt(0).toUpperCase());
        localStorage.setItem("userName", capitializeString(data.foundUser.firstName));
        return data
      } catch (e) {
        const errorTitle =  e.response.data.errors[0] ? e.response.data.errors[0] : errorMessage;
        toast({
            title: errorTitle,
            status: 'error',
            variant:'left-accent',
            isClosable: true,
        });
        return thunkAPI.rejectWithValue(errorTitle);
    }
    }
)

const initialState= {
    user:{},
    isLoginFetching: false,
    isLoginSuccess: false,
    isRegisterFetching: false,
    isRegisterSuccess: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut() {
            localStorage.removeItem("token");
            localStorage.removeItem("avatarName");
            localStorage.removeItem("userName");
            return { ...initialState }
        }
    },
    extraReducers: {
        [signupUser.fulfilled]: (state, { payload }) => {
            state.isRegisterFetching = false;
            state.isRegisterSuccess = true;
            state.user = payload.createdUser;
        },
        [signupUser.pending]: (state) => {
            state.isRegisterFetching = true;
        },
        [signupUser.rejected]: (state) => {
            state.isRegisterFetching = false;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.isLoginFetching = false;
            state.isLoginSuccess = true;        
            state.user = payload.foundUser;
        },
        [loginUser.rejected]: (state) => {
            state.isLoginFetching = false;
        },
        [loginUser.pending]: (state) => {
            state.isLoginFetching = true;
        },
    },
})
export const { logOut }  = userSlice.actions;
export const userSelector = state => state.user