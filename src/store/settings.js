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
    statusSettings: '',
    error: '',
    action: 'SETTINGS',
  },
  reducers: {
    logOutSettings: (state) => {
      state.settings = null;
      state.statusSettings = '';
      state.error = '';
    },
    delMessage: (state) => {
      state.message = null;
    },

    delError: (state) => {
      state.error = null;
    },

    setAction: (state, { payload }) => {
      state.action = payload.action;
    },

    changeSettings: (state, { payload }) => {
      const newSettings = state.settings.map((setting) =>
        setting.feature === payload.feature && setting.type === payload.type
          ? { ...setting, value: payload.value, updated: true }
          : setting
      );
      state.settings = newSettings;
    },
  },
  extraReducers: {
    [getAllSettings.pending]: (state) => {
      state.statusSettings = 'loading';
      state.error = '';
      state.settings = [];
    },
    [getAllSettings.fulfilled]: (state, action) => {
      state.settings = action.payload;
      state.statusSettings = 'success';
      state.error = '';
      state.message = null;
    },
    [getAllSettings.rejected]: (state, action) => {
      state.settings = [];
      state.statusSettings = 'failed';
      state.error = action.payload;
    },
    [updateSettings.pending]: (state) => {
      state.statusSettings = 'loading';
      state.error = '';
    },
    [updateSettings.fulfilled]: (state, action) => {
      state.settings = action.payload;
      state.statusSettings = 'success';
      state.error = '';
      state.message = 'Configuración modificada';
    },
    [updateSettings.rejected]: (state, action) => {
      state.settings = [];
      state.statusSettings = 'failed';
      state.error = action.payload;
      state.message = 'Error modificando la configuración';
    },
  },
});

export const {
  logOutSettings,
  initEditSettings,
  changeSettings,
  setAction,
  delMessage,
  delError,
} = settingsSlice.actions;

export default settingsSlice.reducer;
