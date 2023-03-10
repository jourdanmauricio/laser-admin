import { axiosApi } from '../api';

export const getUsers = async () => {
  return axiosApi
    .get('/users')
    .then((res) => res.data.results)
    .catch((err) => {
      let message = '';
      message = err.response.status
        ? `${err.response.status}: ${err.response.statusText} - ${err.response.data}`
        : 'Error Obteniendo Usuarios 😞';
      throw message;
    });
};

export const getProfile = async () => {
  try {
    const response = await axiosApi.get('/users/profile');
    return response.data;
  } catch (error) {
    let message = '';
    message = error.response.status
      ? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
      : 'Error Obteniendo datos de usuario 😞';
    throw message;
  }
};

export const postUser = async (user) => {
  try {
    const newUser = await axiosApi.post('/users', user);
    return newUser.data.newUser;
  } catch (error) {
    let message = '';
    message = error.response.status
      ? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
      : 'Error Obteniendo Usuarios 😞';
    throw message;
  }
};

export const putUserChangePass = async (id, newPassword) => {
  try {
    const newUser = await axiosApi.put(`/users/change-password/${id}`, {
      id,
      newPassword,
    });
    return newUser;
  } catch (error) {
    let message = '';
    message = error.response.status
      ? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
      : 'Error modificando el usuario 😞';
    throw message;
  }
};

export const putUser = async (user) => {
  try {
    const { id } = user;
    delete user.id;
    const newUser = await axiosApi.put(`/users/${id}`, user);
    return newUser.data;
  } catch (error) {
    let message = '';
    message = error.response.status
      ? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
      : 'Error modificando el usuario 😞';
    throw message;
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await axiosApi.delete(`/users/${id}`);
    return user;
  } catch (error) {
    let message = '';
    message = error.response.status
      ? `${error.response.status}: ${error.response.statusText} - ${error.response.data}`
      : 'Error modifcando el usuario 😞';
    throw message;
  }
};
