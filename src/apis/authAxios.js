import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosConfig from './axios';

const authAxios = axios.create(axiosConfig);

/* =========================
   REQUEST INTERCEPTOR
========================= */

authAxios.interceptors.request.use(
  async (config) => {
    const token =
      await AsyncStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

authAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          await AsyncStorage.getItem(
            'refresh_token'
          );

        // CALL REFRESH API
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken =
          response.data.access_token;

        await AsyncStorage.setItem(
          'access_token',
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return authAxios(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem(
          'access_token'
        );

        await AsyncStorage.removeItem(
          'refresh_token'
        );

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(
      error.response?.data || error
    );
  }
);

export default authAxios;