import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Can thiệp vào Response
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về thẳng data để UI không phải gọi response.data.data
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    // Xử lý lỗi tập trung
    const originalRequest = error.config;

    // Ví dụ: Xử lý hết hạn token (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Viết logic gọi API refresh token ở đây
        // const newToken = await refreshToken();
        // await AsyncStorage.setItem('access_token', newToken);
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Gọi lại request ban đầu với token mới
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Logout user nếu refresh token cũng hết hạn
        await AsyncStorage.removeItem('access_token');
        // Điều hướng về màn hình Login...
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient;