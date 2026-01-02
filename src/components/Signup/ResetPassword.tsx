"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Common/Input";
import { Button } from "@/components/Common/Button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useValidateResetToken, useSetPassword } from "@/hooks/useAuth";
import Image from "next/image";

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface ResetPasswordProps {
  resetToken: string;
}

export default function ResetPassword({ resetToken }: ResetPasswordProps) {
  const router = useRouter();
  const [status, setStatus] = useState<
    "validating" | "valid" | "expired" | "success"
  >("validating");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    isError: isTokenError,
    isSuccess: isTokenSuccess,
    isLoading: isTokenLoading,
  } = useValidateResetToken(resetToken);

  const { mutate: setPassword, isPending: isSubmitting } = useSetPassword(
    resetToken,
    () => {
      setStatus("success");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  );

  useEffect(() => {
    if (isTokenError) {
      setStatus("expired");
    } else if (isTokenSuccess) {
      setStatus("valid");
    }
  }, [isTokenError, isTokenSuccess]);

  const onSubmit = (data: PasswordFormValues) => {
    setError(null);
    setPassword(
      { newPassword: data.newPassword },
      {
        onError: (err: any) => {
          setError(
            err.response?.data?.message ||
              "Something went wrong. Please try again."
          );
        },
      }
    );
  };

  if (isTokenLoading || status === "validating") {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
        <p className="text-gray-300">Validating token...</p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Link Expired or Invalid
          </h2>
          <p className="text-gray-400 mb-6">
            The password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Button
            onClick={() => router.push("/forgot-password")}
            className="w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500"
          >
            Back to Forgot Password
          </Button>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Password Changed!
          </h2>
          <p className="text-gray-400 mb-6">
            Your password has been successfully updated. Redirecting to login...
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6">
      {/* Logo / Avatar */}
      <div className="mb-6 sm:mb-8">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-pink-400 bg-black/30 shadow-lg flex items-center justify-center relative">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={99}
            height={72}
            className="w-16 h-14 sm:w-24 sm:h-20 object-contain"
          />
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-gray-900">
        <h1 className="text-center text-white text-3xl sm:text-4xl font-semibold mb-2">
          Create Password
        </h1>

        <p className="text-center text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 px-4">
          Protect your account with a unique password at least 6 characters
          long.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="New password"
            type="password"
            placeholder="6–60 characters"
            error={errors.newPassword?.message}
            {...register("newPassword")}
            className="bg-gray-900 border-gray-600 text-white focus:ring-cyan-500 h-12 sm:h-14"
          />

          <Input
            label="Re-enter new password"
            type="password"
            placeholder="Re-enter password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
            className="bg-gray-900 border-gray-600 text-white focus:ring-cyan-500 h-12 sm:h-14"
          />

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} variant="primary">
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Save"
              )}
            </Button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-center text-gray-300 text-base sm:text-lg hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
