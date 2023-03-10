import { axiosApi } from '../api';

export const createPost = async (formPost) => {
  try {
    const response = await axiosApi.post('/posts', formPost);
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

export const getPosts = async () => {
  try {
    const response = await axiosApi.get('/posts');
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

export const updatePost = async (data2) => {
  try {
    let data = Object.assign({}, data2);
    const id = data.id;
    delete data.id;
    delete data.created;
    delete data.createdAt;
    delete data.updatedAt;

    const response = await axiosApi.put(`/posts/${id}`, data);
    return response.data;
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

export const deletePost = async (id) => {
  try {
    const response = await axiosApi.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    let message = '';
    console.log('error', error.response.data);
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : 'Error eliminando el post 😞';
    throw message;
  }
};
