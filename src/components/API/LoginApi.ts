import axios from "axios";
import {removeUser,persistor,store} from "../exporter/exporter"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 || error.response?.status === 403) {
      // If this is a retry that failed -> refresh token probably expired
      if (originalRequest._retry) {
        store.dispatch(removeUser());
        persistor.purge();
        window.location.href = "/signin";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.get(`/auth/refreshAccessToken/${store.getState().auth.loggedInUser.id}`); // backend sets new cookies
        processQueue(null);
        return api(originalRequest);
      } catch (err: any) {
        processQueue(err, null);

        // Refresh token also failed → logout
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const googleAuth = (code: string) => api.get(`/auth/google?code=${code}`);

export default api;
