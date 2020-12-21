import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'
import {fetchItems, addItemAPI, deleteItemAPI } from '../../api/api'
import * as authAPI from "../../api/authAPI";

const getAllItems = createAsyncThunk("items/getAllItems", async () => fetchItems());

const addItemThunk = createAsyncThunk("item/addItemThunk", async (data) => {
    const {token, name} = data
    const config = authAPI.configToken(token)
    const body = JSON.stringify({ name: name });
    const resp = await Axios.post('/api/items', body, config)
    console.log(resp)
    return resp.data
})

const deleteItemThunk = createAsyncThunk("item/deleteItemThunk", async (data) => {
    const {token, id} = data
    
    const config = authAPI.configToken(token)
    const resp = await Axios.delete('/api/items/' + id._id,  config)
    console.log(resp)
    return resp.data
})

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
          state.error = null
        },

        [getAllItems.rejected]: (state, action) => {
          state.status = "rejected";
          state.error = action.error;
        },
        
        [addItemThunk.pending]: state => {
            state.status = "add item pending";
          },
  
          [addItemThunk.fulfilled]: (state, action) => {
            state.status = "add item fulfilled";
            state.items.unshift(action.payload)
            state.error = null 
          },
  
          [addItemThunk.rejected]: (state, action) => {
              console.log(action)
            state.status = "add item rejected";
            state.error = action.error;
          },
          [deleteItemThunk.pending]: state => {
            state.status = "delete item pending";
          },
  
          [deleteItemThunk.fulfilled]: (state, action) => {
            console.log(action)
            const id = action.payload.id
            state.status = "delete item fulfilled";
            state.items = state.items.filter(item => item._id !== id)
            state.error = null 
          },
  
          [deleteItemThunk.rejected]: (state, action) => {
              console.log(action.error)
            state.status = "delete item rejected";
            state.error = action.error;
          }
      }

})

export const {addItem, deleteItem } = itemsSlice.actions
export const asyncActions = {getAllItems, addItemThunk, deleteItemThunk}

export default itemsSlice.reducer