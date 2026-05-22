import authAxios from "../authAxios";
import publicAxios from "../publicAxios";


export const searchJobsApi = async (params) => {
  return publicAxios.get('/jobs/', { params });
};

export const loadMoreJobsApi = async (nextUrl) => {
  return publicAxios.get(nextUrl);
};

export const getCategoriesApi = async () => {
  return publicAxios.get('/categories/')
}

export const postJobApi = async (payload) => {
  return authAxios.post('/jobs/', payload)
}

export const publishJobApi = async (jobId, packageType) => {
  return authAxios.post(`/jobs/${jobId}/publish/`, packageType)
}