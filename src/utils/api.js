import axios from "axios";

const API_URL = "http://localhost:7001/api"; // Backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Adds Authorization Token
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handles Token Expiry and Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(refreshToken);
        
        if (!refreshToken) throw new Error("No refresh token available");
        const res = await axios.post(`${API_URL}/users/refresh-token`, {
          refreshToken,
        });

        // Store new tokens in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        // Retry the failed request with new token
        originalRequest.headers["Authorization"] = `Bearer ${res.data.token}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh Token Failed:", err);
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
