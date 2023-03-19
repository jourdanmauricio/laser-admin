import { axiosApi } from '../api';

export const getSections = async () => {
  try {
    const response = await axiosApi.get('/sections');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error obteniendo secciones 😞';
    throw message;
  }
};

export const updateSectionsApi = async (data) => {
  try {
    const data2 = JSON.parse(JSON.stringify(data));
    for (const section of data2) {
      if (section.updated === true) {
        console.log('updateSectionApi', section);
        const id = section.id;
        delete section.id;
        delete section.subsections;
        delete section.updated;
        delete data.createdAt;
        delete data.updatedAt;
        await axiosApi.put(`/sections/${id}`, section);
      }
    }
    const newSections = await getSections();
    return newSections;
  } catch (error) {
    console.log('error!!!!!!!!!!!', error);
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el post 😞';
    throw message;
  }
};

export const updateSubsectionsApi = async (data) => {
  console.log('updateSubsectionsApi', data);
  try {
    const data2 = JSON.parse(JSON.stringify(data));
    for (const section of data2) {
      for (const subsection of section.subsections) {
        if (subsection.updated === true) {
          console.log('updateSubsectionsApi', subsection);
          const id = subsection.id;
          delete subsection.updated;
          await axiosApi.put(`/subsections/${id}`, subsection);
        }
      }
    }
    const newSections = await getSections();
    return newSections;
  } catch (error) {
    console.log('error!!!!!!!!!!!', error);
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el post 😞';
    throw message;
  }
};

export const cretateSubsectionApi = async (subsection) => {
  try {
    const data = Object.assign({}, subsection);
    delete data.id;
    delete data.updated;
    await axiosApi.post('/subsections', data);
    const newSections = await getSections();
    return newSections;
  } catch (error) {
    console.log('error!!!!!!!!!!!', error);
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el post 😞';
    throw message;
  }
};

export const deleteSubsectionApi = async (id) => {
  try {
    await axiosApi.delete(`/subsections/${id}`);
    const newSections = await getSections();
    return newSections;
  } catch (error) {
    console.log('error!!!!!!!!!!!', error);
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el post 😞';
    throw message;
  }
};
