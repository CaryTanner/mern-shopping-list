import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {fetchItems, addItemAPI, deleteItemAPI } from '../../api/api'


const getAllItems = createAsyncThunk("items/getAllItems", async () => fetchItems());



const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: "NONE",
        error: {}
    },
    reducers: { 
        
        addItem: {
            reducer(state, action){
                const {name} = action.payload
                addItemAPI(name)
                state.items.unshift(action.payload)
            }
        },
        deleteItem: {
            reducer(state, action){ 
                const {_id} = action.payload
               deleteItemAPI(_id)
               state.items = state.items.filter(item => item._id !== _id)
            }
        },
        itemsLoading: {
            reducer(state, action){
                state.isLoading = true
            }
        }
    
    },
    extraReducers: {
        [getAllItems.pending]: state => {
          state.status = "pending";
        },

        [getAllItems.fulfilled]: (state, action) => {
          state.status = "fulfilled";
          state.items = action.payload;
        },

        [getAllItems.rejected]: (state, action) => {
          state.status = "rejected";
          state.error = action.error;
        }
      }

})

export const {addItem, deleteItem } = itemsSlice.actions
export const asyncActions = {getAllItems}

export default itemsSlice.reducer