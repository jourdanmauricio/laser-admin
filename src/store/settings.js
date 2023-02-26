import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchSettings, updateSettings } from '../services/api/settings.api';

export const getSettings = createAsyncThunk(
  'settings/getSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await fetchSettings();
      console.log('settings', settings);
      return settings;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putSettings = createAsyncThunk(
  'settings/putSettings',
  async (data, { rejectWithValue }) => {
    try {
      console.log('data', data);
      const settings = await updateSettings(data);
      return settings;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

let settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: null,
    editSettings: null,
    status: '',
    error: '',
    action: 'VIEW',
  },
  reducers: {
    logOutSettings: (state) => {
      state.settings = null;
      state.editSettings = null;
      state.status = '';
      state.error = '';
    },
    initEditSettings: (state) => {
      state.action = 'EDIT';
      state.editSettings = state.settings;
      state.message = null;
    },
    setSettings: (state, { payload }) => {
      console.log('payload store', payload);
      console.log('store state', state.editSettings);
      const feature = state.editSettings.find(
        (setting) => setting.feature === payload.feature
      );
      console.log('feature store', feature);
      feature.value = payload.value;

      const newEditSettings = state.editSettings.map((setting) =>
        setting.id === feature.id ? feature : setting
      );

      state.editSettings = newEditSettings;
      //  state.editSettings = {
      //    ...state.editSettings,
      //    [payload.name]: payload.value,
      //  };

      // state.status = '';
      // state.error = '';
    },
  },
  extraReducers: {
    [getSettings.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.settings = null;
    },
    [getSettings.fulfilled]: (state, action) => {
      console.log(action);
      state.settings = action.payload;
      state.status = 'success';
      state.error = '';
      state.editSettings = state.settings;
    },
    [getSettings.rejected]: (state, action) => {
      state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
    },
    [putSettings.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      // state.settings = null;
    },
    [putSettings.fulfilled]: (state, action) => {
      console.log('action.payload', action.payload);
      state.settings = action.payload;
      state.status = 'success';
      state.error = '';
    },
    [putSettings.rejected]: (state, action) => {
      console.log('action.payload', action.payload);
      state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { logOutSettings, initEditSettings, setSettings } =
  settingsSlice.actions;

export default settingsSlice.reducer;
