import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getSettingsApi,
  // updateSettings,
  updateSettingsApi,
} from '@/services/api/settings.api';

export const getAllSettings = createAsyncThunk(
  'settings/getAllSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await getSettingsApi();
      // console.log('settings', settings);
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
    // editSettings: null,
    status: '',
    error: '',
    action: 'SETTINGS',
  },
  reducers: {
    logOutSettings: (state) => {
      state.settings = null;
      // state.editSettings = null;
      state.status = '';
      state.error = '';
    },
    // initEditSettings: (state) => {
    //   state.action = 'EDIT';
    //   state.editSettings = state.settings;
    //   state.message = null;
    // },

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
      console.log(action);
      state.settings = action.payload;
      state.status = 'success';
      state.error = '';
      // state.editSettings = state.settings;
    },
    [getAllSettings.rejected]: (state, action) => {
      state.settings = [];
      state.status = 'failed';
      state.error = action.payload;
    },
    [updateSettings.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      // state.settings = null;
    },
    [updateSettings.fulfilled]: (state, action) => {
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
