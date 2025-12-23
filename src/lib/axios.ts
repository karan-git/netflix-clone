import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com", // Dummy URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          // Import authService dynamically to avoid circular dependency
          const { authService } = await import("@/services/authService");
          const data = await authService.refreshToken(refreshToken);

          if (data.data.accessToken) {
            if (data.data.accessToken) {
              Cookies.set("token", data.data.accessToken, { expires: 7 });
            }
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.data.accessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails, clear cookies and redirect
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, clear and redirect
        // route to login if not in login page
        Cookies.remove("token");
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
