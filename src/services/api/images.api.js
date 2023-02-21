import { axiosApi } from '../api';

export const getAllImages = async () => {
  try {
    const response = await axiosApi.get('/images');
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error obteniendo imágenes 😞';
    throw message;
  }
};

export const deleteImage = async (id) => {
  try {
    console.log('id', id);
    const response = await axiosApi.delete(`/images`, {
      data: { public_id: id },
    });
    console.log('response', response.data);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminado imagen 😞';
    throw message;
  }
};
