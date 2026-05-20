import publicAxios from "../publicAxios";


export const searchJobsApi = async (params) => {
  return publicAxios.get('/jobs/', { params });
};

export const loadMoreJobsApi = async (nextUrl) => {
  return publicAxios.get(nextUrl);
};

export const getCategories = async () => {
  return publicAxios.get('/categories/')
}