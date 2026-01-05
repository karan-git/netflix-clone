"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "@/context/ToastContext";
const { showToast } = useToast();
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
    console.log("Request Error", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Response Error", error);
    showToast(
      error?.data?.response?.message ||
        "Failed to load profiles. Please try again.",
      "error"
    );
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          // Import authService dynamically to avoid circular dependency
          const { authService } = await import("@/services/authService");
          const data = await authService.refreshToken(refreshToken);

          if (data.token) {
            Cookies.set("token", data.token, { expires: 7 });
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.log(refreshError);
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
