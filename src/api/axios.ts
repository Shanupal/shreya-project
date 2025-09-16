import axios from "axios";
import { getToken, clearToken } from "../utils/token";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://mental-health-bk-1.onrender.com";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (!config.headers) config.headers = {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      clearToken();
    }
    return Promise.reject(err);
  }
);

export default api;
