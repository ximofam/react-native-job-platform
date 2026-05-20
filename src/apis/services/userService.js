import authAxios from '../authAxios';

export const getCurrentUserApi = () => {
  return authAxios.get('/users/me/');
};