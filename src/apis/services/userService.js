import authAxios from '../authAxios';

export const getCurrentUserApi = () => {
  return authAxios.get('/users/me/');
};

export const addEducationApi = (data) => {
  return authAxios.post('/users/me/educations/', data)
}

export const addExperienceApi = (data) => {
  return authAxios.post('/users/me/experiences/', data)
}

export const uploadCvApi = (data) => {
  return authAxios.postForm('/cvs/', data)
}