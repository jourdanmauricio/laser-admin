import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllServicesApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi,
} from '@/services/api/services.api';

export const getAllServices = createAsyncThunk(
  'services/getAllServices',
  async (_, { rejectWithValue }) => {
    try {
      const allServices = await getAllServicesApi();
      return allServices;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onCreateService = createAsyncThunk(
  'service/createService',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const services = state.services.services;
      const newService = services.find((service) => service.id === 0);

      const newServices = await createServiceApi(newService);
      return newServices;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onUpdateService = createAsyncThunk(
  'service/updateService',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const services = state.services.services;
      const updService = await updateServiceApi(services);
      return updService;
    } catch (error) {
      console.log('ERRRRRRRRRRRRRRORRR', error);
      return rejectWithValue(error);
    }
  }
);

export const onDeleteService = createAsyncThunk(
  'service/deleteService',
  async (delService, { rejectWithValue }) => {
    try {
      const newServices = await deleteServiceApi(delService.id);
      return newServices;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    status: '',
    error: '',
    actionServices: 'SERVICES',
    message: null,
  },
  reducers: {
    setActionServices: (state, { payload }) => {
      state.actionServices = payload.action;
    },
    setNewService: (state, { payload }) => {
      state.services = [...state.services, payload.service];
      state.actionServices = 'NEW';
    },
    changeService: (state, { payload }) => {
      const newServices = state.services.map((service) =>
        service.id === payload.id
          ? { ...service, [payload.name]: payload.value, updated: true }
          : service
      );
      state.services = newServices;
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
    [getAllServices.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.services = [];
      state.message = null;
    },
    [getAllServices.fulfilled]: (state, action) => {
      state.services = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionServices = 'SERVICES';
    },
    [getAllServices.rejected]: (state, action) => {
      state.services = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error obteniendo los servicios';
    },
    [onCreateService.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onCreateService.fulfilled]: (state, action) => {
      state.services = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionServices = 'SERVICES';
      state.message = 'Servicio creado!';
    },
    [onCreateService.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
      state.message = 'Error creando servicio';
    },

    [onDeleteService.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onDeleteService.fulfilled]: (state, action) => {
      state.services = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionServices = 'SERVICES';
      state.message = 'Servicio eliminado!';
    },
    [onDeleteService.rejected]: (state, action) => {
      // state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error eliminado servicio';
    },
    [onUpdateService.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onUpdateService.fulfilled]: (state, action) => {
      state.services = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionServices = 'SERVICES';
      state.message = 'Servicio modificado!';
    },
    [onUpdateService.rejected]: (state, action) => {
      state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error modificando servicio';
    },
  },
});

export const {
  setActionServices,
  changeService,
  setNewService,
  delError,
  delMessage,
} = servicesSlice.actions;

export default servicesSlice.reducer;
