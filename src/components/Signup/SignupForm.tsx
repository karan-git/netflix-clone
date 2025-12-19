"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormValues } from "@/lib/validations/auth";
import { useSignup } from "@/hooks/useAuth";

export default function SignupForm({ initialEmail }: { initialEmail: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: signup, isPending, error: authError } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: initialEmail,
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    signup(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-24">
      {/* Logo */}
      <div className="relative mb-10">
        <div className="w-28 h-28 rounded-full border-4 border-pink-400 bg-black/30 shadow-lg" />
        <Image
          width={99}
          height={72}
          src="/images/logo.png"
          alt="Logo"
          className="absolute inset-0 m-auto w-24 h-20"
        />
      </div>

      <h1 className="text-3xl sm:text-5xl font-semibold mb-4">
        Create Password
      </h1>
      <p className="text-neutral-300 text-base sm:text-xl mb-10">
        You're almost there! Create a password to finish signing up.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        {authError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
            {(authError as any)?.response?.data?.message ||
              "Signup failed. Please try again."}
          </div>
        )}

        {/* Email (Read-only) */}
        <div>
          <label className="block text-left text-sm text-zinc-300 mb-2">
            Email
          </label>
          <input
            type="email"
            readOnly
            className="w-full h-14 px-4 rounded-xl bg-transparent border border-neutral-400 text-neutral-400 focus:outline-none"
            {...register("email")}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-left text-sm text-zinc-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full h-14 px-4 rounded-xl bg-transparent border ${
                errors.password ? "border-red-500" : "border-neutral-400"
              } text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-12`}
              placeholder="*************"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-red-500 text-xs text-left">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-left text-sm text-zinc-300 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className={`w-full h-14 px-4 rounded-xl bg-transparent border ${
                errors.confirmPassword ? "border-red-500" : "border-neutral-400"
              } text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-12`}
              placeholder="*************"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-red-500 text-xs text-left">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-14 rounded-full text-xl font-semibold bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isPending && <Loader2 className="animate-spin" size={24} />}
          {isPending ? "Signing Up..." : "Finish Signup"}
        </button>
      </form>
    </div>
  );
}
