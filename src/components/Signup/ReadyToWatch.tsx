"use client";

import { useSignup } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Please select a country"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

// const COUNTRIES = [
//   { code: "IN", name: "India (+91)" },
//   { code: "US", name: "United States (+1)" },
//   { code: "GB", name: "United Kingdom (+44)" },
//   { code: "AU", name: "Australia (+61)" },
//   { code: "CA", name: "Canada (+1)" },
//   { code: "DE", name: "Germany (+49)" },
//   { code: "FR", name: "France (+33)" },
//   { code: "JP", name: "Japan (+81)" },
//   { code: "BR", name: "Brazil (+55)" },
//   { code: "ZA", name: "South Africa (+27)" },
//   { code: "AE", name: "United Arab Emirates (+971)" },
//   { code: "SG", name: "Singapore (+65)" },
// ];

import { useEffect, useState } from "react";
import { Alert } from "@/components/Common/Alert";
import { Button } from "@/components/Common/Button";
import { Input } from "@/components/Common/Input";

import { AuthResponse } from "@/types/auth";

import { AuthFormLayout } from "@/components/Common/AuthFormLayout";

export default function ReadyToWatch({
  onNextStep,
}: {
  onNextStep: (data: AuthResponse) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const {
    mutate: signup,
    isPending,
    error: authError,
  } = useSignup((data) => {
    console.log(data);
    if (!data.status) {
      setError(data?.message || "Signup failed. Please try again.");
      return;
    }
    onNextStep(data);
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      country: "US",
    },
  });

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.country_code) {
          //   // Check if country exists in our list, if not add it
          //   const exists = COUNTRIES.some((c) => c.code === data.country_code);
          //   if (!exists) {
          //     COUNTRIES.push({
          //       code: data.country_code,
          //       name: `${data.country_name} (+${data.country_calling_code})`,
          //     });
          //   }
          setValue("country", data.country_code);
        }
      } catch (error) {
        console.error("Failed to detect country:", error);
      }
    };
    detectCountry();
  }, [setValue]);

  const onSubmit = (data: SignupFormValues) => {
    signup({ email: data.email, country: data.country });
  };

  return (
    <AuthFormLayout
      title="Ready to watch?"
      subtitle="Enter your email to create or sign in to your account."
    >
      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="w-full max-w-xl space-y-4"
      >
        {(authError || error) && (
          <Alert
            type="error"
            message={
              (authError as any)?.response?.data?.message ||
              error ||
              "Signup failed. Please try again."
            }
          />
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Country Selection */}
          {/* <div className="w-full sm:w-1/3">
              <label className="block text-left text-sm text-zinc-300 mb-2">
                Country
              </label>
              <select
                className={`w-full h-14 px-4 rounded-xl bg-gray-800 border ${
                  errors.country ? "border-red-500" : "border-neutral-400"
                } text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none`}
                {...register("country")}
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-red-500 text-xs text-left">
                  {errors.country.message}
                </p>
              )}
            </div> */}

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
          Get Started
        </Button>
      </form>
    </AuthFormLayout>
  );
}
