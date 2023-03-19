import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAllTestimonialsApi,
  createTestimonialApi,
  updateTestimonialApi,
  deleteTestimonialApi,
} from '@/services/api/testimonials.api';

export const getAllTestimonials = createAsyncThunk(
  'testimonials/getAllTestimonials',
  async (_, { rejectWithValue }) => {
    try {
      const allTestimonials = await getAllTestimonialsApi();
      return allTestimonials;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onCreateTestimonial = createAsyncThunk(
  'testimonials/onCreateTestimonial',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const testimonials = state.testimonials.testimonials;
      const newTestimonial = testimonials.find(
        (testimonial) => testimonial.id === 0
      );

      const newTestimonials = await createTestimonialApi(newTestimonial);
      return newTestimonials;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const onUpdateTestimonial = createAsyncThunk(
  'testimonials/onUpdateTestimonial',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const testimonials = state.testimonials.testimonials;
      const updTestimonial = await updateTestimonialApi(testimonials);
      return updTestimonial;
    } catch (error) {
      console.log('ERRRRRRRRRRRRRRORRR', error);
      return rejectWithValue(error);
    }
  }
);

export const onDeleteTestimonial = createAsyncThunk(
  'testimonial/onDeleteTestimonial',
  async (delTestimonial, { rejectWithValue }) => {
    try {
      const newTestimonials = await deleteTestimonialApi(delTestimonial.id);
      return newTestimonials;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    testimonials: [],
    status: '',
    error: '',
    actionTestimonials: 'TESTIMONIALS',
    message: null,
  },
  reducers: {
    setActionTestimonials: (state, { payload }) => {
      state.actionTestimonials = payload.action;
    },
    changeTestimonial: (state, { payload }) => {
      const newTestimonials = state.testimonials.map((testimonial) =>
        testimonial.id === payload.id
          ? { ...testimonial, [payload.name]: payload.value, updated: true }
          : testimonial
      );
      state.testimonials = newTestimonials;
    },
    setNewTestimonial: (state, { payload }) => {
      state.testimonials = [...state.testimonials, payload.testimonial];
      state.actionTestimonials = 'NEW';
    },
    delError: (state) => {
      state.error = '';
      state.message = null;
    },
  },
  extraReducers: {
    [getAllTestimonials.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.testimonials = [];
      state.message = null;
    },
    [getAllTestimonials.fulfilled]: (state, action) => {
      state.testimonials = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionTestimonials = 'TESTIMONIALS';
    },
    [getAllTestimonials.rejected]: (state, action) => {
      state.testimonials = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error obteniendo los testimonios';
    },
    [onCreateTestimonial.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onCreateTestimonial.fulfilled]: (state, action) => {
      state.testimonials = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionTestimonials = 'TESTIMONIALS';
      state.message = 'Testimonio creado!';
    },
    [onCreateTestimonial.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
      state.message = 'Error creando testimonio';
    },
    [onDeleteTestimonial.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onDeleteTestimonial.fulfilled]: (state, action) => {
      state.testimonials = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionTestimonials = 'TESTIMONIALS';
      state.message = 'Testimonio eliminado!';
    },
    [onDeleteTestimonial.rejected]: (state, action) => {
      state.testimonials = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error eliminado testimonio';
    },
    [onUpdateTestimonial.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [onUpdateTestimonial.fulfilled]: (state, action) => {
      state.testimonials = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionTestimonials = 'TESTIMONIALS';
      state.message = 'Testimonio modificado!';
    },
    [onUpdateTestimonial.rejected]: (state, action) => {
      state.testimonials = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error modificando testimonio';
    },
  },
});

export const {
  setActionTestimonials,
  changeTestimonial,
  setNewTestimonial,
  delError,
} = testimonialsSlice.actions;

export default testimonialsSlice.reducer;
