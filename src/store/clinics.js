import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllClinicsApi,
  createClinicApi,
  updateClinicApi,
  deleteClinicApi,
} from '@/services/api/clinics.api';

export const getAllClinics = createAsyncThunk(
  'clinics/getAllClinics',
  async (_, { rejectWithValue }) => {
    try {
      const allClinics = await getAllClinicsApi();
      return allClinics;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onCreateClinic = createAsyncThunk(
  'clinics/createClinic',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const clinics = state.clinics.clinics;
      const newClinic = clinics.find((clinic) => clinic.id === 0);

      const newClinics = await createClinicApi(newClinic);
      return newClinics;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onUpdateClinic = createAsyncThunk(
  'clinics/updateClinic',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const clinics = state.clinics.clinics;
      const updClinic = await updateClinicApi(clinics);
      return updClinic;
    } catch (error) {
      console.log('ERRRRRRRRRRRRRRORRR', error);
      return rejectWithValue(error);
    }
  }
);

export const onDeleteClinic = createAsyncThunk(
  'clinics/deleteClinic',
  async (delClinic, { rejectWithValue }) => {
    try {
      const newClinics = await deleteClinicApi(delClinic.id);
      return newClinics;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let clinicsSlice = createSlice({
  name: 'clinics',
  initialState: {
    clinics: [],
    status: '',
    error: '',
    actionPosts: 'CLINICS',
    message: null,
  },
  reducers: {
    setActionClinics: (state, { payload }) => {
      state.actionClinics = payload.action;
    },
    changeClinic: (state, { payload }) => {
      const newClinics = state.clinics.map((clinic) =>
        clinic.id === payload.id
          ? { ...clinic, [payload.name]: payload.value, updated: true }
          : clinic
      );
      state.clinics = newClinics;
    },
    setNewClinic: (state, { payload }) => {
      state.clinics = [...state.clinics, payload.clinic];
      state.actionClinics = 'NEW';
    },
    delError: (state) => {
      state.error = '';
      state.message = null;
    },
    delMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: {
    [getAllClinics.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.clinics = [];
      state.message = null;
    },
    [getAllClinics.fulfilled]: (state, action) => {
      state.clinics = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionClinics = 'CLINICS';
    },
    [getAllClinics.rejected]: (state, action) => {
      state.clinics = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error obteniendo los consultorios';
    },
    [onCreateClinic.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onCreateClinic.fulfilled]: (state, action) => {
      state.clinics = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionClinics = 'CLINICS';
      state.message = 'consultorio creado!';
    },
    [onCreateClinic.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
      state.message = 'Error creando consultorio';
    },

    [onDeleteClinic.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onDeleteClinic.fulfilled]: (state, action) => {
      state.clinics = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionPosts = 'CLINICS';
      state.message = 'Consultorio eliminado!';
    },
    [onDeleteClinic.rejected]: (state, action) => {
      state.clinics = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error eliminado consultorio';
    },
    [onUpdateClinic.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onUpdateClinic.fulfilled]: (state, action) => {
      state.clinics = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionClinics = 'CLINICS';
      state.message = 'Consultorio modificado!';
    },
    [onUpdateClinic.rejected]: (state, action) => {
      state.clincs = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error modificando consultorio';
    },
  },
});

export const {
  setActionClinics,
  changeClinic,
  setNewClinic,
  delError,
  delMessage,
} = clinicsSlice.actions;

export default clinicsSlice.reducer;
