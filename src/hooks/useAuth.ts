import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  SetPasswordRequest,
  SetPasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "@/types/auth";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      if (data.data.token) {
        Cookies.set("token", data.data.token, { expires: 7 }); // Save token for 7 days
        if (data.data.refreshToken) {
          Cookies.set("refreshToken", data.data.refreshToken, { expires: 30 }); // Save refresh token for 30 days
        }
        router.push("/who-is-watching");
      }
    },
  });
};

export const useSignup = (onSuccess?: (data: AuthResponse) => void) => {
  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

export const useValidateResetToken = (token: string) => {
  return useQuery({
    queryKey: ["validateResetToken", token],
    queryFn: () => authService.validateResetToken(token),
    enabled: !!token,
    retry: false,
  });
};

export const useSetPassword = (
  token: string,
  onSuccess?: (data: SetPasswordResponse) => void
) => {
  return useMutation({
    mutationFn: (data: SetPasswordRequest) =>
      authService.setPassword(token, data),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

export const useForgotPassword = (
  onSuccess?: (data: ForgotPasswordResponse) => void
) => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};
