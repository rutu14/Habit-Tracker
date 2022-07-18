import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
const config = { headers: { 'authorization': token } };

export const getLabels = createAsyncThunk(
    "users/getLabels",
    async (thunkAPI) => {
        try {
            const { data } = await axios.get('/api/labels', config);
            return data.labels;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.errors[0]);
        }
    }
)

  export const createaLabel = createAsyncThunk(
    "users/createaLabel",
    async ({label,toast},thunkAPI) => {
        try {
            const { data } = await axios.post('/api/labels/addlabel', {label}, config);
            toast({
                title: 'Added an label 🖍',
                status: 'success',
                variant:'left-accent',
                isClosable: true,
            });
            return data.labels;
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

export const deleteaLabel = createAsyncThunk(
    "users/deleteaLabel",
    async ({labelId,toast},thunkAPI) => {
		try {
			const { data } = await axios.delete( `/api/labels/${labelId}`, config);
			toast({
				title: 'Label Deleted',
				status: 'success',
				variant:'left-accent',
				isClosable: true,
			}) 
			return data.labels;
		} catch (e) {
			thunkAPI.rejectWithValue(e.response.data.errors[0]);
		}
    }
)

const initialState= {
    labels:[],
    isLabelFetching: false,  
    isCreateLabelFetching: false,
    isDeleteLabelFetching: false, 
    
};

export const LabelSlice = createSlice({
	name: "labels",
	initialState,
	reducers: {},
	extraReducers: {
		[getLabels.fulfilled]: (state, { payload }) => {
			state.isLabelFetching = false;
			state.labels = payload;
		},
		[getLabels.pending]: (state) => {
			state.isLabelFetching = true;
		},
		[getLabels.rejected]: (state) => {
			state.isLabelFetching = false;
		},
		[createaLabel.fulfilled]: (state, { payload }) => {
			state.isCreateLabelFetching = false;
			state.labels = payload;
		},
		[createaLabel.pending]: (state) => {
			state.isCreateLabelFetching = true;
		},
		[createaLabel.rejected]: (state) => {
			state.isCreateLabelFetching = false;
		},
		[deleteaLabel.fulfilled]: (state, { payload }) => {
			state.isDeleteLabelFetching = false;
			state.labels = payload;
		},
		[deleteaLabel.pending]: (state) => {
			state.isDeleteLabelFetching = true;
		},
		[deleteaLabel.rejected]: (state) => {
			state.isDeleteLabelFetching = false;
		},
	},
})
export const labelSelector = state => state.labels;