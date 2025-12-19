import api from "@/lib/axios";
import { AuthResponse, LoginRequest, SignupRequest } from "@/types/auth";
import Cookies from "js-cookie";
export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // const response = await api.post<AuthResponse>("/auth/login", data);
    return {
      user: {
        id: "1",
        email: "karan",
      },
      token: "karan",
    };
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/signup", data);
    return response.data;
  },

  logout: () => {
    // Logic for logout if needed (e.g., calling an API)
  },
};
