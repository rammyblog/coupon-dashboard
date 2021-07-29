import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    /** In dev, intercepts request and logs it into console for dev */
    const token = localStorage.getItem("coupon_access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;

export default axios;