import api from "@/lib/axios";
import axios from "axios";
import Cookies from "js-cookie";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  ValidateResetTokenResponse,
  SetPasswordRequest,
  SetPasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "@/types/auth";
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

  validateResetToken: async (
    token: string
  ): Promise<ValidateResetTokenResponse> => {
    const response = await axios.get<ValidateResetTokenResponse>(
      `https://api.nabtt.com/user/validateResetToken?token=${token}`
    );
    return response.data;
  },

  setPassword: async (
    token: string,
    data: SetPasswordRequest
  ): Promise<SetPasswordResponse> => {
    const response = await axios.post<SetPasswordResponse>(
      `https://api.nabtt.com/user/setPassword?token=${token}`,
      data
    );
    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const response = await axios.post<ForgotPasswordResponse>(
      "https://api.nabtt.com/user/forgetPassword",
      data
    );
    return response.data;
  },
};
