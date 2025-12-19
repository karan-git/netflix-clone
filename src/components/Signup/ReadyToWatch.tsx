"use client";

import Image from "next/image";

export default function ReadyToWatch({
  onNextStep,
}: {
  onNextStep: () => void;
}) {
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

        {/* Email Input */}
        <div className="w-full max-w-xl">
          <label className="block text-left text-sm text-zinc-300 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="XYZ@gmail.com"
            className="w-full h-14 px-4 rounded-xl bg-transparent border border-neutral-400 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* CTA Button */}
        <button
          onClick={onNextStep}
          className="mt-8 px-12 py-4 rounded-full text-xl font-semibold bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}
