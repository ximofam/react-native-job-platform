import axios from 'axios';
import axiosConfig from './axios';

const publicAxios = axios.create(axiosConfig);

publicAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(
      error.response?.data || error
    );
  }
);

export default publicAxios;