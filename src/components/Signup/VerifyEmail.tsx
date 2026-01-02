"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/Common/Button";
import { useRouter } from "next/navigation";
import { AuthResponse } from "@/types/auth";

export default function VerifyEmail({
  authData,
}: {
  authData: AuthResponse | null;
}) {
  const router = useRouter();

  const handleContinue = () => {
    if (authData?.link) {
      window.location.href = authData.link;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* ================= CONTENT ================= */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center w-full max-w-4xl mx-auto">
        {/* Logo */}
        <div className="relative mb-8 sm:mb-10">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-pink-400 bg-black/30 shadow-lg" />
          <Image
            width={99}
            height={72}
            src="/images/logo.png"
            alt="Logo"
            className="absolute inset-0 m-auto w-16 h-14 sm:w-24 sm:h-20"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-4 max-w-4xl px-2">
          Finish signing up to start watching
        </h1>

        {/* Sub text */}
        <div className="text-neutral-300 text-sm sm:text-lg md:text-xl mb-6 px-4">
          Almost there! We just sent an email to
          <span className="block font-medium text-white mt-1 break-all">
            {authData?.email || "XYZ@gmail.com"}
          </span>
        </div>

        {/* Description */}
        <p className="text-base sm:text-xl md:text-2xl text-white max-w-3xl mb-8 sm:mb-10 px-4">
          Follow the further steps from your email
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4">
          <Button
            onClick={handleContinue}
            variant="primary"
            className="w-full sm:w-auto min-w-[200px]"
            leftIcon={<SquareArrowOutUpRight />}
          >
            Continue With Link
          </Button>
          <Button
            onClick={() => router.push("/login")}
            variant="primary"
            className="w-full sm:w-auto min-w-[200px]"
          >
            Sign In
          </Button>
        </div>
      </main>
    </div>
  );
}
