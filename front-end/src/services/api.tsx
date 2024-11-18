import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
})

api.interceptors.request.use(config => {
  let token

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (typeof window === "undefined")
      return Promise.reject(error);
    if (
      error?.response?.status === 401 &&
      !window?.location?.pathname.includes("/login")
    ) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api
