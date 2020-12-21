import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import Axios from "axios";

import * as authAPI from "../../api/authAPI";


const loadUserThunk = createAsyncThunk("auth/loadUserThunk", async (token) => {
    const resp = await authAPI.loadUser(token);
 
  return resp;
});

const registerUserThunk = createAsyncThunk("auth/registerUserThunk", async (userInfo) => {
    const resp = await authAPI.registerUser(userInfo);
 
  return resp;
});

const loginUserThunk = createAsyncThunk("auth/loginUserThunk", async (userInfo) => {
    const resp = await authAPI.loginUser(userInfo);
  
  return resp;
});





const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: null,
    user: null,
    error: null
  },
  reducers: {
    clearAuth: {
      reducer(state, action) {
        localStorage.removeItem('token')
        state.token = null;
        state.isLoading = null;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      }
    },
    clearError: {
        reducer(state, action) {
          state.error = null;
        }
      },
  },
  extraReducers: {
    [loadUserThunk.pending]: (state) => {
      state.isLoading = true;
    },

    [loadUserThunk.fulfilled]: (state, action) => {
        state.isLoading = null;
        if(action.payload.status === 200){
            state.user = action.payload.data;
            state.isAuthenticated = true;
            state.error = null;
        } else {
            state.user = null;
            state.isAuthenticated = false;
            state.error = {msg: action.payload.data.msg, status: action.payload.status}
        }
      
      
      
      
    },
    [registerUserThunk.pending]: (state) => {
        state.isLoading = true;
      },
  
      [registerUserThunk.fulfilled]: (state, action) => {
          state.isLoading = null;
          if(action.payload.status === 200){
              localStorage.setItem('token', action.payload.data.token)
              state.user = action.payload.data.user;
              state.isAuthenticated = true;
              state.error = null;
          } else {
            localStorage.removeItem('token')
              state.user = null;
              state.isAuthenticated = false;
              state.error = {msg: action.payload.data.msg, status: action.payload.status}
          }
          
      },
      [loginUserThunk.pending]: (state) => {
        state.isLoading = true;
      },
  
      [loginUserThunk.fulfilled]: (state, action) => {
          state.isLoading = null;
          if(action.payload.status === 200){
              localStorage.setItem('token', action.payload.data.token)
              state.user = action.payload.data.user;
              state.isAuthenticated = true;
              state.error = null;
          } else {
            localStorage.removeItem('token')
              state.user = null;
              state.isAuthenticated = false;
              state.error = {msg: action.payload.data.msg, status: action.payload.data.status}
          }
          
      },

    [loadUserThunk.rejected]: (state, action) => {
     const {msg, status, id } = action.payload 
    state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = {msg, status, id}
    },
  },
});

export default authSlice.reducer;
export const { clearAuth, clearError } = authSlice.actions
export const asyncAuthActions = {loadUserThunk, registerUserThunk, loginUserThunk}