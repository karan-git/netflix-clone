"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/useAuth";
import { Alert } from "@/components/Common/Alert";
import { Button } from "@/components/Common/Button";
import { Input } from "@/components/Common/Input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error: authError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Main Section */}
      <div className="flex flex-col items-center pt-32 pb-24">
        <h1 className="text-white text-5xl font-semibold">Welcome</h1>
        <p className="text-white text-xl mt-3">Sign In to Continue</p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 w-full max-w-md space-y-6"
        >
          {authError && (
            <Alert
              type="error"
              message={
                (authError as any)?.response?.data?.message ||
                "Login failed. Please try again."
              }
            />
          )}

          <Input
            label="Email"
            type="email"
            placeholder="XYZ@gmail.com"
            className="mt-2 h-14 rounded-xl border-neutral-200 bg-transparent text-white placeholder-white/40"
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="*************"
              className="mt-2 h-14 rounded-xl border-neutral-200 bg-transparent text-white placeholder-white/40"
              error={errors.password?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
              {...register("password")}
            />
            {/* RIGHT ALIGNED, SAME POSITION FEEL */}
            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-teal-400 text-sm underline"
              >
                Forgot Password
              </Link>
            </div>
          </div>

          <Button type="submit" isLoading={isPending} variant="primary">
            Sign In
          </Button>
        </form>

        {/* OR Divider */}
        <div className="mt-8 text-neutral-500 font-semibold">OR</div>

        {/* Social Buttons */}
        <Button
          variant="custom"
          className="mt-6 w-80 h-12 rounded-full border border-neutral-200"
          size="md"
          leftIcon={
            <Image
              src="/images/google.png"
              alt="Google"
              width={20}
              height={20}
            />
          }
        >
          <span className="text-white font-semibold">Sign in with Google</span>
        </Button>

        <Button
          variant="custom"
          className="mt-4 w-80 h-12 rounded-full border border-neutral-200"
          size="md"
          leftIcon={
            <Image src="/images/apple.png" alt="Apple" width={20} height={20} />
          }
        >
          <span className="text-white font-semibold">Sign in with Apple</span>
        </Button>

        {/* Signup */}
        <div className="mt-10 flex gap-2 text-stone-300">
          <p>You don’t have an account?</p>
          <Link href="/signup" className="text-teal-500 font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
