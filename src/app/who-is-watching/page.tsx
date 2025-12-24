"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import { Plus, User, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Common/Input";
import { Button } from "@/components/Common/Button";

interface Profile {
  id: string;
  name: string;
  avatar: string; // This will be a gradient class or image path
  isImage?: boolean;
}

const AVATAR_COLORS = [
  "from-sky-500 via-cyan-500 to-teal-500",
  "from-purple-500 via-pink-500 to-red-500",
  "from-orange-500 via-amber-500 to-yellow-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-indigo-500 via-blue-500 to-sky-500",
];

export default function WhosWatching() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      name: "Karan",
      avatar: "from-sky-500 via-cyan-500 to-teal-500",
    },
    {
      id: "2",
      name: "Kids",
      avatar: "/images/kids.png",
      isImage: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[0]);

  const handleAddProfile = () => {
    if (!newName.trim()) return;

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: newName,
      avatar: selectedColor,
    };

    setProfiles([...profiles, newProfile]);
    setNewName("");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col font-manrope">
      {/* Header divider */}
      <div className="border-b border-neutral-800" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <h1 className="text-white text-5xl font-bold mb-20 tracking-tight">
          Who’s watching?
        </h1>

        {/* Profiles */}
        <div className="flex flex-wrap gap-16 items-start justify-center max-w-6xl px-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => router.push("/home")}
            >
              <div
                className={`w-44 h-44 rounded-[45px] overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-teal-500/20 ${
                  profile.isImage ? "" : `bg-gradient-to-br ${profile.avatar}`
                }`}
              >
                {profile.isImage ? (
                  <img
                    src={profile.avatar}
                    className="w-full h-full object-cover"
                    alt={profile.name}
                  />
                ) : (
                  <User size={60} className="text-white/90" />
                )}
              </div>
              <p className="mt-6 text-zinc-400 text-2xl font-bold group-hover:text-white transition-colors">
                {profile.name}
              </p>
            </div>
          ))}

          {/* Add Profile Button */}
          <div
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="w-44 h-44 rounded-[45px] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-105">
              <Plus
                size={60}
                className="text-white/30 group-hover:text-white/60"
              />
            </div>
            <p className="mt-6 text-zinc-500 text-2xl font-bold group-hover:text-white transition-colors">
              Add Profile
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-xl bg-zinc-900 border border-white/10 rounded-[40px] p-12 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white">Add Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={24} className="text-zinc-400" />
              </button>
            </div>

            <div className="space-y-10">
              {/* Avatar Preview */}
              <div className="flex justify-center">
                <div
                  className={`w-40 h-40 rounded-[40px] bg-gradient-to-br ${selectedColor} flex items-center justify-center shadow-2xl shadow-teal-500/20`}
                >
                  <User size={60} className="text-white" />
                </div>
              </div>

              {/* Name Input */}
              <Input
                label="Profile Name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter name"
                className="h-16 bg-white/5 border-white/10 rounded-2xl px-6 text-xl text-white focus:border-teal-500 placeholder:text-zinc-600"
                autoFocus
              />

              {/* Color Selection */}
              <div className="">
                <label className="text-zinc-400 text-lg font-medium ml-2">
                  Choose Avatar Color
                </label>
                <div className="flex gap-4 justify-between mt-4">
                  {AVATAR_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 ${
                        selectedColor === color
                          ? "ring-4 ring-white ring-offset-4 ring-offset-zinc-900 scale-110"
                          : ""
                      }`}
                    >
                      {selectedColor === color && (
                        <Check size={24} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <Button
                onClick={handleAddProfile}
                disabled={!newName.trim()}
                className="w-full h-16 rounded-2xl text-xl font-bold mt-4"
              >
                Add Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
