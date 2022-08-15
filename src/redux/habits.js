import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errorMessage } from "../utils";

export const getAllHabits = createAsyncThunk(
    "users/getAllHabits",
    async (toast,thunkAPI) => {
		try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
			const { data } = await axios.get( '/api/habits', config);
			return data.habits;
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

export const createaHabit = createAsyncThunk(
    "users/createaHabit",
    async ({habit,toast},thunkAPI) => {
        try {
		    const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
			const { data } = await axios.post( '/api/habits', {habit}, config);
			toast({
				title: 'Added an habit',
				variant:'habitCreated',
				isClosable: true,
                icon: '✨',
			});
			return data.habits;
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

export const editaHabit = createAsyncThunk(
    "users/editaHabit",
    async ({habitid, habit, toast},thunkAPI) => {
		try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
			const { data } = await axios.post( `/api/habits/${habitid}`, {habit}, config);
			toast({
				title: 'Updated the habit',
				status: 'success',
				variant:'habitEdited',
				isClosable: true,
                icon: '🖊'
			});
			return data.habits;
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

export const deleteaHabit = createAsyncThunk(
    "users/deleteaHabit",
    async ({habitId,toast},thunkAPI) => {
    	try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
			const { data } = await axios.delete( `/api/habits/${habitId}`, config);
			toast({
				title: 'Deleted the habit',
				status: 'success',
				variant:'habitDeleted',
				isClosable: true,
                icon: '🗑'
			});
			return data.habits;
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

export const getArchive = createAsyncThunk(
    "users/getArchive",
    async (toast,thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
            const { data } = await axios.get( '/api/archives', config);
            return data.archives;
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

export const addToArchive = createAsyncThunk(
    "users/addToArchive",
    async ({habitId,toast},thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
            const { data } = await axios.post( `/api/archives/${habitId}`,{}, config);
            toast({
                title: 'Added to archive',
                status: 'success',
                variant:'habitCreated',
                isClosable: true,
                icon: '✨'
            });
            return data;
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

export const restoreArchive = createAsyncThunk(
    "users/restoreArchive",
    async ({habitId, toast},thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
            const { data } = await axios.post( `/api/archives/restore/${habitId}`,{}, config);
            toast({
                title: 'Restored the archive',
                status: 'success',
                variant:'habitEdited',
                isClosable: true,
                icon: '🗄'
            });
            return data;
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
  
export const deleteArchive = createAsyncThunk(
    "users/deleteArchive",
    async ({habitId, toast},thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const config = { headers: { 'authorization': token } };
            const { data } = await axios.delete( `/api/archives/${habitId}`, config);
            toast({
				title: 'Deleted the archive',
				status: 'success',
				variant:'habitDeleted',
				isClosable: true,
                icon: '🗑'
			});
            return data.archives;
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
    habits:[],
    archives:[],
    isGetHabitFetching: false,
    isCreateFetching: false,
    isEditFetching: false, 
    isDeleteFetching: false,
    isGetArchiveFetching:false, 
    isAddToArchiveFetching:false,
    isRestoreArchiveFetching:false,
    isDeleteArchiveFetching:false
};

export const HabitSlice = createSlice({
  	name: "habits",
  	initialState,
  	reducers: {},
  	extraReducers: {
		[getAllHabits.fulfilled]: (state, { payload }) => {
			state.isGetHabitFetching = false;
			state.habits = payload;
		},
		[getAllHabits.pending]: (state) => {
			state.isGetHabitFetching = true;
		},
		[getAllHabits.rejected]: (state) => {
			state.isGetHabitFetching = false;
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
        [getArchive.fulfilled]: (state, { payload }) => {
            state.isGetArchiveFetching = false;
            state.archives = payload;
        },
        [getArchive.pending]: (state) => {
            state.isGetArchiveFetching = true;
        },
        [getArchive.rejected]: (state) => {
            state.isGetArchiveFetching = false;
        },
        [addToArchive.fulfilled]: (state, { payload }) => {
              state.isAddToArchiveFetching = false;       
              state.archives = payload.archives;
              state.habits = payload.habits;
        },
        [addToArchive.rejected]: (state) => {
              state.isAddToArchiveFetching = false;
        },
        [addToArchive.pending]: (state) => {
              state.isAddToArchiveFetching = true;
        },
        [restoreArchive.fulfilled]: (state, { payload }) => {
              state.isRestoreArchiveFetching = false;
              state.archives = payload.archives;
              state.habits = payload.habits;
        },
        [restoreArchive.pending]: (state) => {
              state.isRestoreArchiveFetching = true;
        },
        [restoreArchive.rejected]: (state) => {
              state.isRestoreArchiveFetching = false;
        },
        [deleteArchive.fulfilled]: (state, { payload }) => {
              state.isDeleteArchiveFetching = false;
              state.archives = payload;
        },
        [deleteArchive.pending]: (state) => {
              state.isDeleteArchiveFetching = true;
        },
        [deleteArchive.rejected]: (state) => {
              state.isDeleteArchiveFetching = false;
        },
  	},
})
export const habitSelector = state => state.habits;