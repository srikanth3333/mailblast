import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadFile = createAsyncThunk('upload/uploadFile', 
	async (payload, {getState}) => {
        let user = localStorage.getItem('email');
        return await axios.get(`http://localhost:3000/api/upload?page=${payload.page}&email=${payload.email}&user=${user}`, {
        })
        .then(res => {
            
            console.log('res')
            console.log(res)
            console.log(payload)
            return{data:res.data.data,totalCount:res.data.totalCount}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const fileUploadSlice = createSlice({
	name: 'uploadFile',
	initialState: {
        loading: true,
        error: false,
        data: [],
        totalCount: 0,
    },
	extraReducers: {
		[uploadFile.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[uploadFile.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.totalCount = action.payload.totalCount
		},
		[uploadFile.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default fileUploadSlice.reducer;