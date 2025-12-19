import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthResponse, LoginRequest, SignupRequest } from "@/types/auth";

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
        router.push("/home");
      }
    },
  });
};

export const useSignup = (onSuccess?: (data: AuthResponse) => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      } else {
        router.push("/home");
      }
    },
  });
};
