"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/Common/Button";

import { AuthResponse } from "@/types/auth";

export default function VerifyEmail({
  authData,
}: {
  authData: AuthResponse | null;
}) {
  const handleContinue = () => {
    if (authData?.data?.link) {
      window.location.href = authData.data.link;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* ================= CONTENT ================= */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
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

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-semibold mb-4 max-w-4xl">
          Finish signing up to start watching
        </h1>

        {/* Sub text */}
        <p className="text-neutral-300 text-base sm:text-xl mb-6">
          Almost there! We just sent an email to
          <span className="block font-medium text-white mt-1">
            {authData?.data?.email || "XYZ@gmail.com"}
          </span>
        </p>

        {/* Description */}
        <p className="text-lg sm:text-2xl text-white max-w-3xl mb-10">
          You are only a few steps away from watching your favourite shows and
          movies.
        </p>

        {/* CTA */}
        <Button
          onClick={handleContinue}
          variant="custom"
          className="flex items-center gap-3 px-10 py-4 rounded-full text-xl font-medium bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500"
          leftIcon={<SquareArrowOutUpRight />}
        >
          Continue With Link
        </Button>
      </main>
    </div>
  );
}
