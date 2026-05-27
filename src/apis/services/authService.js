import AsyncStorage from '@react-native-async-storage/async-storage';

import publicAxios from '../publicAxios';
import authAxios from '../authAxios';
import gotifyAxios from '../gotifyAxios';

export const registerCandidateApi = async (data) => {
  return publicAxios.post('/auth/register/candidate/', data)
}

export const registerEmployerApi = async (data) => {
  return publicAxios.post('/auth/register/employer/', data)
}

export const loginApi = async ({ username, password }) => {
  const response = await publicAxios.post('/auth/token/', {
    username: username,
    password: password,
    grant_type: "password",
    client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
    client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
  });

  await AsyncStorage.setItem('access_token', response.access_token);
  await AsyncStorage.setItem('refresh_token', response.refresh_token);

  try {
    const gotifyResponse = await authAxios.get('/gotify/basic-token/');

    if (gotifyResponse && gotifyResponse.basic_token) {
      await AsyncStorage.setItem('gotify_basic_token', gotifyResponse.basic_token);

      const clientRes = await gotifyAxios.post('/client', {
        name: `AppClient_${Date.now()}`
      });

      await AsyncStorage.setItem('gotify_client', JSON.stringify(clientRes));
    }
  } catch (error) {
    console.error("Khởi tạo token Gotify thất bại nhưng vẫn cho phép login:", error);
  }

  return response;
};

export const refreshTokenApi = async () => {
  const refreshToken = await AsyncStorage.getItem('refresh_token');

  const response = await publicAxios.post('/auth/token/', {
    refresh_token: refreshToken,
    grant_type: "refresh_token",
    client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
    client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
  });

  await AsyncStorage.setItem('access_token', response.access_token);

  return response.access_token;
};

export const logoutApi = async () => {
  try {
    const clientResString = await AsyncStorage.getItem('gotify_client');

    if (clientResString) {
      const clientRes = JSON.parse(clientResString);
      await gotifyAxios.delete(`/client/${clientRes.id}`);
    }
  } catch (error) {
    console.error("Lỗi khi xóa Gotify Client trên server:", error);
  }

  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('refresh_token');
  await AsyncStorage.removeItem('gotify_client');
  await AsyncStorage.removeItem('gotify_basic_token');
};