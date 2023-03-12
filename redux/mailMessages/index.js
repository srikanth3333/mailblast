import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getReports = createAsyncThunk('reports/getReportsData', 
	async (payload, {getState}) => {
        console.log('qorking...')
        return await axios.get(`/api/mailchimp/mailMessages?user=${payload.user}&page=${payload.page}`)
        .then(res => {
            console.log(res)
            return{data:res.data.data,totalCount:res.data.totalCount}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const index = createSlice({
	name: 'getReports',
	initialState: {
        loading: true,
        error: false,
        data: [],
        totalCount: 0,
    },
	extraReducers: {
		[getReports.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getReports.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.totalCount = action.payload.totalCount
		},
		[getReports.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default index.reducer;