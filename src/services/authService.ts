import api from "@/lib/axios";
import Cookies from "js-cookie";
import { AuthResponse, LoginRequest, SignupRequest } from "@/types/auth";
export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/user/email-login", data);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/subscription/email", data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/user/refresh-token", {
      refreshToken,
    });
    return response.data;
  },

  logout: () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  },
};
