import publicAxios from "../publicAxios";

export const getCitiesApi = async () => {
  return publicAxios.get('/cities/');
};

export const getDistrictsApi = async (cityId) => {
  return publicAxios.get(`/cities/${cityId}/districts/`);
};

export const getCountriesApi = async () => {
  return publicAxios.get('/countries/');
}