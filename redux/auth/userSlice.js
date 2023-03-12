import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



export const getUsersList = createAsyncThunk('users/getUsersList', 
	async (payload, {getState}) => {
        return await axios.get(`/api/auth/allUsers?page=${payload.page}`)
        .then(res => {
            return{data:res.data.data,totalCount:res.data.totalCount}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)


export const userSlice = createSlice({
	name: 'users',
	initialState: {
		loading: true,
		error:'',
		dataUser: [],
		data:[],
		filterObject:null,
		loggedIn: false,
		totalCount:0,
	},
	reducers: {
		addFilters: (state,action) => {
			state.filterObject = action.payload.data
		},
		loginStatus: (state,action) => {
			state.loggedIn = action.payload.loggedIn
		},
		addFilters: (state,action) => {
			state.filterObject = action.payload.data
		},
	},
	extraReducers: {
		[getUsersList.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getUsersList.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.totalCount = action.payload.totalCount
		},
		[getUsersList.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});


export const { addFilters, loginStatus } = userSlice.actions;

export default userSlice.reducer;