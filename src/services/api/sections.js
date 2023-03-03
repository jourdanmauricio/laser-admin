import { axiosApi } from '../api';

// export const createPost = async (formPost) => {
//   try {
//     console.log('formPost', formPost);
//     const response = await axiosApi.post('/posts', formPost);
//     return response.data;
//   } catch (error) {
//     let message = '';
//     console.log('error', error.response.data);
//     message = error.response.data
//       ? `${error.response.data.statusCode}: ${error.response.data.message}`
//       : 'Error creando el post 😞';
//     throw message;
//   }
// };

export const getSections = async () => {
  try {
    const response = await axiosApi.get('/sections');
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

export const updateSection = async (data2) => {
  try {
    let data = Object.assign({}, data2);
    console.log('UPD', data);
    const id = data.id;
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    const response = await axiosApi.put(`/sections/${id}`, data);
    console.log('response', response);
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

export const updateSubsection = async (data2) => {
  try {
    let data = Object.assign({}, data2);
    data.subsections.map(async (subsection) => {
      const id = subsection.id;
      const response = await axiosApi.put(`/subsections/${id}`, subsection);
      return response.data;
    });
    return data;
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
// export const deletePost = async (id) => {
//   try {
//     const response = await axiosApi.delete(`/posts/${id}`);
//     return response.data;
//   } catch (error) {
//     let message = '';
//     console.log('error', error.response.data);
//     message = error.response.data
//       ? `${error.response.data.statusCode}: ${error.response.data.message}`
//       : 'Error eliminando el post 😞';
//     throw message;
//   }
// };
