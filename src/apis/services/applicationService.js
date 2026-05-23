import authAxios from "../authAxios"


export const getApplicationsApi = async () => {
  return authAxios.get('/applications/')
}


export const getApplicationApi = async (id) => {
  return authAxios.get(`/applications/${id}/`)
}


export const updateApplicationStatusApi = async (id, status) => {
  return authAxios.patch(`/applications/${id}/status/`, {
    "status": status
  })
}

export const getMyCvsApi = async () => {
  return authAxios.get(`/cvs/my/`)
}

export const createApplicationApi = async (payload) => {
  return authAxios.post('/applications/', payload)
}