"use client";

import { useForgotPassword } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Alert } from "@/components/Common/Alert";
import { Button } from "@/components/Common/Button";
import { Input } from "@/components/Common/Input";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

import { AuthFormLayout } from "@/components/Common/AuthFormLayout";

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    mutate: forgotPassword,
    isPending,
    error: authError,
  } = useForgotPassword((data) => {
    if (data.status) {
      setSuccessMessage(data.message || "Email Sent Successfully.");
      setError(null);
    } else {
      setError(data.message || "User does not found with that email.");
      setSuccessMessage(null);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setError(null);
    setSuccessMessage(null);
    forgotPassword({ email: data.email });
  };

  return (
    <AuthFormLayout
      title="Forgot Password?"
      subtitle="Enter your email to get a password reset link."
    >
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-4"
      >
        {(authError || error) && (
          <Alert
            type="error"
            message={
              (authError as any)?.response?.data?.message ||
              error ||
              "Failed to reset password. Please try again."
            }
          />
        )}

        {successMessage && <Alert type="success" message={successMessage} />}

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Email Input */}
          <Input
            label="Email"
            type="email"
            placeholder="XYZ@gmail.com"
            className="h-14 rounded-xl bg-transparent border-neutral-400 text-white placeholder-neutral-500 focus:ring-cyan-400"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        {/* CTA Button */}
        <Button
          type="submit"
          isLoading={isPending}
          variant="primary"
          className="mt-12"
        >
          Submit
        </Button>
      </form>
    </AuthFormLayout>
  );
}
