// handlers/redux/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import APIs from '../../apis/auth-apis';

// Thunk for login async action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials:any, { rejectWithValue }) => {
    try {
      const response = await APIs.loginUser(credentials);
      return response.data; // Assuming response.data contains the user object
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Store the user data in state
      })
      .addCase(loginUser.rejected, (state: any, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
