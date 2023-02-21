import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { login } from '../services/api/auth.api';
import Axios from 'axios';
import { putUser } from '../services/api/users.api';

export const signIn = createAsyncThunk('user/signIn', async (data) => {
  const API_URL = `${import.meta.env.VITE_BACKEND_API}/auth/login`;
  // async operation
  const response = await Axios.post(API_URL, data);

  return response.data.user;
});

export const updProfile = createAsyncThunk(
  'user/updProfile',
  async (data, { rejectWithValue }) => {
    try {
      const user = await putUser(data);
      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

let userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: '',
    message: null,
    error: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = '';
    },
    delMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.status = 'loading';
      state.message = null;
    },
    [signIn.fulfilled]: (state, action) => {
      console.log('action.payload', action.payload);
      state.user = action.payload;
      state.status = 'success';
      state.message = null;
    },
    [signIn.rejected]: (state) => {
      state.status = 'failed';
    },
    // updProfile
    [updProfile.pending]: (state) => {
      state.status = 'loading';
      state.message = null;
    },
    [updProfile.fulfilled]: (state, action) => {
      console.log('action.payload', action.payload);
      state.user = { ...state.user, ...action.payload };
      state.status = 'success';
      state.message = 'Perfil modificado';
    },
    [updProfile.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error modificando el perfil';
    },
  },
});

export const { logOut, delMessage } = userSlice.actions;

export default userSlice.reducer;
