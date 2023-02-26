import { axiosApi } from '../api';

export const getAllClinics = async () => {
  try {
    const response = await axiosApi.get('/clinics');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error obteniendo las clínicas 😞';
    throw message;
  }
};

export const createClinic = async (data) => {
  try {
    const response = await axiosApi.post('/clinics', data);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando la clínica 😞';
    throw message;
  }
};

export const updateClinic = async (data) => {
  try {
    const id = data.id;
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    const response = await axiosApi.put(`/clinics/${id}`, data);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error modificando la clínica 😞';
    throw message;
  }
};

export const deleteClinic = async (id) => {
  try {
    const response = await axiosApi.delete(`/clinics/${id}`);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error elinando la clínica 😞';
    throw message;
  }
};
