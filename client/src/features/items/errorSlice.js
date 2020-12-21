import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'






const errorSlice = createSlice({
    name: 'error',
    initialState: {
        msg: {}, 
        status: null, 
        id: null
    },
    reducers: {
        getErrors: {
             reducer(state, action){
                 state.msg = action.payload.msg
                 state.status = action.payload.status
                 state.id = action.payload.id
             }   
        },
        clearErrors: {
            reducer(state){
                state.msg = {}
                state.status = null
                state.id = null
            }   
       },


    },
})

export const {getErrors, clearErrors} = errorSlice.actions

export default errorSlice.reducer