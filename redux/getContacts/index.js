import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContacts = createAsyncThunk('contacts/getContacts', 
	async (payload, {getState}) => {
        return await axios.get(`/api/mailchimp/getContacts`)
        .then(res => {
            return{data:res.data.data}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const index = createSlice({
	name: 'contacts',
	initialState: {
        loading: true,
        error: false,
        data: [],
        totalCount: 0,
    },
	extraReducers: {
		[getContacts.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getContacts.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.totalCount = action.payload.totalCount
		},
		[getContacts.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default index.reducer;