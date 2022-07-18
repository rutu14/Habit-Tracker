import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { 'authorization': token } };

export const getAllHabits = createAsyncThunk(
    "users/getAllHabits",
    async (thunkAPI) => {
		try {
			const { data } = await axios.get( '/api/habits', config);
			return data.habits;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data.errors[0]);
		}
    }
)

export const getOneHabit = createAsyncThunk(
    "users/getOneHabit",
    async (habitid,thunkAPI) => {
		try {
			const { data } = await axios.get( `/api/habits/${habitid}`, config);
			return data.habit;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data.errors[0]);
		}
    }
)

export const createaHabit = createAsyncThunk(
    "users/createaHabit",
    async ({habit,toast},thunkAPI) => {
		try {
			const { data } = await axios.post( '/api/habits', {habit}, config);
			toast({
				title: 'Added an habit✨',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			});
			return data.habits;
		} catch (e) {
			toast({
				title: e.response.data.errors[0],
				status: 'error',
				variant:'left-accent',
				isClosable: true,
			}) 
			return thunkAPI.rejectWithValue(e.response.data.errors[0]);
		}
    }
)

export const editaHabit = createAsyncThunk(
    "users/editaHabit",
    async ({habitid, habit, toast}, thunkAPI) => {
		try {
			const { data } = await axios.post( `/api/habits/${habitid}`, {habit}, config);
			toast({
				title: 'Updated the habit🖐🏻',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			});
			return data.habits;
		} catch (e) {
			toast({
				title: e.response.data.errors[0],
				status: 'error',
				variant:'left-accent',
				isClosable: true,
			})
			return thunkAPI.rejectWithValue(e.response.data.errors[0]);
		}
    }
)

export const deleteaHabit = createAsyncThunk(
    "users/deleteaHabit",
    async ({habitid,toast},thunkAPI) => {
    	try {
			const { data } = await axios.delete( `/api/habits/${habitid}`, config);
			toast({
				title: 'Deleted the habit 🔥',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			});
			return data.habits;
      	} catch (e) {
			toast({
				title: e.response.data.errors[0],
				status: 'error',
				variant:'left-accent',
				isClosable: true,
			})
			thunkAPI.rejectWithValue(e.response.data.errors[0]);
		}
    }
)

const initialState= {
    habits:[],
	habitDetail:{},
    isFetching: false,
    isCreateFetching: false,
    isEditFetching: false, 
    isOneHabitFetching: false,
    isDeleteFetching: false, 
};

export const HabitSlice = createSlice({
  	name: "habits",
  	initialState,
  	reducers: {},
  	extraReducers: {
		[getAllHabits.fulfilled]: (state, { payload }) => {
			state.isFetching = false;
			state.habits = payload;
		},
		[getAllHabits.pending]: (state) => {
			state.isFetching = true;
		},
		[getAllHabits.rejected]: (state) => {
			state.isFetching = false;
		},
		[getOneHabit.fulfilled]: (state, { payload }) => {
			state.isOneHabitFetching = false;       
			state.habitDetail = payload;
		},
		[getOneHabit.rejected]: (state, { payload }) => {
			state.isOneHabitFetching = false;
		},
		[getOneHabit.pending]: (state) => {
			state.isOneHabitFetching = true;
		},
		[createaHabit.fulfilled]: (state, { payload }) => {
			state.isCreateFetching = false;
			state.habits = payload;
		},
		[createaHabit.pending]: (state) => {
			state.isCreateFetching = true;
		},
		[createaHabit.rejected]: (state) => {
			state.isCreateFetching = false;
		},
		[editaHabit.fulfilled]: (state, { payload }) => {
			state.isEditFetching = false;
			state.habits = payload;
		},
		[editaHabit.pending]: (state) => {
			state.isEditFetching = true;
		},
		[editaHabit.rejected]: (state) => {
			state.isEditFetching = false;
		},
		[deleteaHabit.fulfilled]: (state, { payload }) => {
			state.isDeleteFetching = false;
			state.habits = payload;
		},
		[deleteaHabit.pending]: (state) => {
			state.isDeleteFetching = true;
		},
		[deleteaHabit.rejected]: (state) => {
			state.isDeleteFetching = false;
		},
  	},
})
export const habitSelector = state => state.habits;