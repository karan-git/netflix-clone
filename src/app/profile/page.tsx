"use client";

import Footer from "@/components/Footer";
import { Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WhosWatching() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header divider */}
      <div className="border-b border-neutral-700" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-white text-5xl font-semibold mb-20">
          Who’s watching?
        </h1>

        {/* Profiles */}
        <div className="flex gap-24 items-start">
          {/* Profile 1 */}
          <div
            className="flex flex-col items-center"
            onClick={() => router.push("/home")}
          >
            <div className="w-44 h-44 rounded-[45px] bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 flex items-center justify-center">
              {/* <div className="w-28 h-28 border-4 border-white rounded-full relative">
                <div className="absolute top-6 left-4 w-8 h-1 border-4 border-white" />
                <div className="absolute top-6 right-4 w-8 h-1 border-4 border-white" />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-2 border-4 border-white" />
              </div> */}
              <User size={40} />
            </div>
            <p className="mt-6 text-white text-2xl font-bold">Karan</p>
          </div>

          {/* Profile 2 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/kids.png"
              className="w-44 h-44 rounded-[45px] object-cover"
              alt="Kids"
            />
            <p className="mt-6 text-white text-2xl font-bold">Kids</p>
          </div>

          {/* Add Profile */}
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 rounded-2xl bg-white/25 flex items-center justify-center">
              <Plus size={40} />
            </div>
            <p className="mt-6 text-white text-2xl font-medium">Add</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
