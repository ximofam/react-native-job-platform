import authAxios from "../authAxios";
import publicAxios from "../publicAxios";


export const searchJobsApi = async (params) => {
  return publicAxios.get('/jobs/', { params });
};

export const getJobApi = async (id) => {
  return publicAxios.get(`/jobs/${id}/`)
}

export const loadMoreJobsApi = async (nextUrl) => {
  return publicAxios.get(nextUrl);
};

export const getCategoriesApi = async () => {
  return publicAxios.get('/categories/')
}

export const postJobApi = async (payload) => {
  return authAxios.post('/jobs/', payload)
}

export const publishJobApi = async (jobId) => {
  return authAxios.post(`/jobs/${jobId}/publish/`)
}

export const publishPriorityJobApi = async (jobId, method) => {
  return authAxios.post(`/payments/`, {
    "method": method,
    "service_type": "JOB_FEATURED",
    "metadata": {
      "job_id": jobId,
      "package": "BASIC"
    }
  })
}