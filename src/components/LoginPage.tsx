"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Main Section */}
      <div className="flex flex-col items-center pt-32 pb-24">
        <h1 className="text-white text-5xl font-semibold">Welcome</h1>
        <p className="text-white text-xl mt-3">Sign In to Continue</p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 w-full max-w-md space-y-6"
        >
          {/* Email */}
          <div>
            <label className="text-zinc-300 text-sm">Email</label>
            <input
              type="email"
              className="mt-2 w-full h-14 px-4 rounded-xl border border-neutral-200 bg-transparent text-white placeholder-white/40"
              placeholder="XYZ@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password + Forgot Password aligned */}
          <div className="relative">
            <label className="text-zinc-300 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-2 w-full h-14 px-4 rounded-xl border border-neutral-200 bg-transparent text-white placeholder-white/40 pr-12"
                placeholder="*************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 text-zinc-400 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full h-14 cursor-pointer rounded-full bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 text-white text-2xl font-semibold"
            onClick={() => router.push("/profile")}
          >
            Sign In
          </button>
        </form>

        {/* OR Divider */}
        <div className="mt-8 text-neutral-500 font-semibold">OR</div>

        {/* Social Buttons */}
        <button className="mt-6 w-80 h-12 flex items-center justify-center gap-4 rounded-full border border-neutral-200">
          <Image src="/images/google.png" alt="Google" width={20} height={20} />
          <span className="text-white font-semibold">Sign in with Google</span>
        </button>

        <button className="mt-4 w-80 h-12 flex items-center justify-center gap-4 rounded-full border border-neutral-200">
          <Image src="/images/apple.png" alt="Apple" width={20} height={20} />
          <span className="text-white font-semibold">Sign in with Apple</span>
        </button>

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
