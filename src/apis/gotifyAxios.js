import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const gotifyAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GOTIFY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

gotifyAxios.interceptors.request.use(
  async (config) => {
    const gotifyBasicToken = await AsyncStorage.getItem('gotify_basic_token');

    if (gotifyBasicToken) {
      config.headers.Authorization = `Basic ${gotifyBasicToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

gotifyAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Gotify: Basic Token hết hạn hoặc không hợp lệ.");
    }

    return Promise.reject(
      error.response?.data || error
    );
  }
);

export default gotifyAxios;