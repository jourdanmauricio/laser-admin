import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSections, updateSubsectionsApi } from '@/services/api/sections';
import {
  cretateSubsectionApi,
  deleteSubsectionApi,
  updateSectionsApi,
} from '../services/api/sections';

export const getAllSections = createAsyncThunk(
  'sections/getAllSections',
  async (_, { rejectWithValue }) => {
    try {
      const allSections = await getSections();
      return allSections;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSections = createAsyncThunk(
  'sections/updateSubsections',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const sections = state.sections.sections;
      const newSections = await updateSectionsApi(sections);
      return newSections;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSubsections = createAsyncThunk(
  'sections/updateSubsections',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const sections = state.sections.sections;
      const newSections = await updateSubsectionsApi(sections);
      return newSections;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSubsection = createAsyncThunk(
  'sections/createSubsection',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const sections = state.sections.sections;

      let subsection = {};
      sections.forEach((section) => {
        section.subsections.forEach((sub) => {
          if (sub.id === 0) subsection = sub;
        });
      });

      const newSubsection = await cretateSubsectionApi(subsection);
      return newSubsection;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSubsection = createAsyncThunk(
  'sections/deleteSubsection',
  async (id, { rejectWithValue }) => {
    try {
      const newSubsection = await deleteSubsectionApi(id);
      return newSubsection;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [],
    status: '',
    error: '',
    actionSections: 'SECTIONS',
    message: null,
  },
  reducers: {
    changeSubsection: (state, { payload }) => {
      const newSections = state.sections.map((section) => {
        if (section.id === payload.sectionId) {
          const newSubsections = section.subsections.map((subsection) => {
            if (subsection.id === payload.id) {
              const newData = {
                ...subsection,
                [payload.name]: payload.value,
                updated: true,
              };
              return newData;
            } else {
              return subsection;
            }
          });
          section.subsections = newSubsections;
          return section;
        } else {
          return section;
        }
      });
      state.sections = newSections;
    },
    changeSection: (state, { payload }) => {
      const newSections = state.sections.map((section) =>
        section.id === payload.id
          ? { ...section, [payload.name]: payload.value, updated: true }
          : section
      );

      state.sections = newSections;
    },
    setActionSection: (state, { payload }) => {
      state.actionSections = payload.action;
    },
    setNewSubsection: (state, { payload }) => {
      const newSections = state.sections.map((section) => {
        if (section.id === payload.subsection.section_id) {
          const newSubsections = [...section.subsections, payload.subsection];
          section.subsections = newSubsections;
          return section;
        } else {
          return section;
        }
      });
      state.sections = newSections;
      state.actionSections = 'NEW';
    },
  },
  extraReducers: {
    [getAllSections.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.sections = [];
      state.message = null;
      state.actionSections = 'SECTIONS';
    },
    [getAllSections.fulfilled]: (state, action) => {
      state.sections = action.payload;
      state.status = 'success';
      state.error = '';
    },
    [getAllSections.rejected]: (state, action) => {
      state.sections = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error obteniendo las secciones';
    },

    [updateSubsections.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.message = null;
    },
    [updateSubsections.fulfilled]: (state, action) => {
      state.sections = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionSections = 'SECTIONS';
      state.message = 'Sección modificada';
    },
    [updateSubsections.rejected]: (state, action) => {
      state.sections = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error modificando las secciones';
    },
    [createSubsection.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
      state.message = null;
    },
    [createSubsection.fulfilled]: (state, action) => {
      state.sections = action.payload;
      state.status = 'success';
      state.error = '';
      state.actionSections = 'SECTIONS';
      state.message = 'Sección modificada';
    },
    [createSubsection.rejected]: (state, action) => {
      state.sections = [];
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error creando la subsección';
    },

    [deleteSubsection.pending]: (state) => {
      state.status = 'loading';
      state.error = '';
    },
    [deleteSubsection.fulfilled]: (state, action) => {
      state.sections = action.payload;
      state.status = 'success';
      state.error = '';
    },
    [deleteSubsection.rejected]: (state, action) => {
      state.settings = null;
      state.status = 'failed';
      state.error = action.payload;
      state.message = 'Error eliminado subsección';
    },
  },
});

export const {
  changeSubsection,
  setActionSection,
  changeSection,
  setNewSubsection,
} = sectionsSlice.actions;

export default sectionsSlice.reducer;
