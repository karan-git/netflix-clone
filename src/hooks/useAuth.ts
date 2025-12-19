import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginRequest, SignupRequest } from "@/types/auth";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      Cookies.set("token", data.token, { expires: 7 }); // Save token for 7 days
      router.push("/home");
    },
  });
};

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: (data) => {
      Cookies.set("token", data.token, { expires: 7 });
      router.push("/home");
    },
  });
};
