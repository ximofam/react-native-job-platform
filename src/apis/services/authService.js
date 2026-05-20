import AsyncStorage from '@react-native-async-storage/async-storage';

import publicAxios from '../publicAxios';

export const registerCandidateApi = async (data) => {
  return publicAxios.post('/auth/register/candidate/', data)
}

export const registerEmployerApi = async (data) => {
  return publicAxios.post('/auth/register/employer/', data)
}

export const loginApi = async ({ username, password, }) => {
  const response = await publicAxios.post('/auth/token/', {
    username: username,
    password: password,
    grant_type: "password",
    client_id: process.env.EXPO_PUBLIC_CLIENT_ID,
    client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
  });

  await AsyncStorage.setItem('access_token', response.access_token);
  await AsyncStorage.setItem('refresh_token', response.refresh_token);

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
  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('refresh_token');
};