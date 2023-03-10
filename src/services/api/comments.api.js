import { axiosApi } from '../api';

export const getComments = async () => {
  try {
    const response = await axiosApi.get('/comments');
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error creando el post 😞';
    throw message;
  }
};
