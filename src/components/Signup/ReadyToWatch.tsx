"use client";

import Image from "next/image";
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

import { useEffect } from "react";

import { AuthResponse } from "@/types/auth";

export default function ReadyToWatch({
  onNextStep,
}: {
  onNextStep: (data: AuthResponse) => void;
}) {
  const {
    mutate: signup,
    isPending,
    error: authError,
  } = useSignup((data) => {
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* ================= CTA SECTION ================= */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
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
          Ready to watch?
        </h1>

        <p className="text-neutral-300 text-base sm:text-xl mb-10 max-w-xl">
          Enter your email to create or sign in to your account.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl space-y-4"
        >
          {authError && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-left">
              {(authError as any)?.response?.data?.message ||
                "Signup failed. Please try again."}
            </div>
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
            <div className="flex-1">
              <label className="block text-left text-sm text-zinc-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="XYZ@gmail.com"
                className={`w-full h-14 px-4 rounded-xl bg-transparent border ${
                  errors.email ? "border-red-500" : "border-neutral-400"
                } text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-xs text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full sm:w-auto px-12 py-4 rounded-full text-xl font-semibold bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isPending && <Loader2 className="animate-spin" size={24} />}
            {isPending ? "Starting..." : "Get Started"}
          </button>
        </form>
      </section>
    </div>
  );
}
