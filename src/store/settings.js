import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { getSettingsApi, updateSettingsApi } from '@/services/api/settings.api';

export const getAllSettings = createAsyncThunk(
  'settings/getAllSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await getSettingsApi();
      return settings;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const settings = state.settings.settings;

      const newSettings = await updateSettingsApi(settings);
      return newSettings;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

let settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: null,
    status: '',
    error: '',
    action: 'SETTINGS',
  },
  reducers: {
    logOutSettings: (state) => {
      state.settings = null;
      state.status = '';
      state.error = '';
    },

    setAction: (state, { payload }) => {
      state.action = payload.action;
    },

    changeSettings: (state, { payload }) => {
      const newSettings = state.settings.map((setting) =>
        setting.feature === payload.feature
          ? { ...setting, value: payload.value, updated: true }
          : setting
      );
      state.settings = newSettings;
    },
  },
  extraReducers: {
    [getAllSettings.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.settings = [];
    },
    [getAllSettings.fulfilled]: (state, action) => {
      state.settings = action.payload;
      state.status = 'success';
      state.error = '';
    },
    [getAllSettings.rejected]: (state, action) => {
      state.settings = [];
      state.status = 'failed';
      state.error = action.payload;
    },
    [updateSettings.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [updateSettings.fulfilled]: (state, action) => {
      console.log('SETTINGS', action.payload);
      state.settings = action.payload;
      state.status = 'success';
      state.error = '';
    },
    [updateSettings.rejected]: (state, action) => {
      state.settings = [];
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { logOutSettings, initEditSettings, changeSettings, setAction } =
  settingsSlice.actions;

export default settingsSlice.reducer;
