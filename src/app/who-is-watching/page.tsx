"use client";

import React, { useEffect, useState } from "react";
import { Plus, User, X, Check, Loader2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Common/Input";
import { Button } from "@/components/Common/Button";
import {
  useProfiles,
  useCreateProfile,
  useUpdateProfile,
  useDeleteProfile,
  useSwitchProfile,
} from "@/hooks/useProfile";
import { Profile } from "@/types/profile";
import { ConfirmationModal } from "@/components/Common/ConfirmationModal";
import { ProfileModal } from "@/components/Common/ProfileModal";
import { useToast } from "@/context/ToastContext";

const AVATAR_COLORS = [
  "from-sky-500 via-cyan-500 to-teal-500",
  "from-purple-500 via-pink-500 to-red-500",
  "from-orange-500 via-amber-500 to-yellow-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-indigo-500 via-blue-500 to-sky-500",
];

export default function WhosWatching() {
  const router = useRouter();
  const { showToast } = useToast();

  const { data: profileData, isLoading, isError } = useProfiles();
  const createProfileMutation = useCreateProfile();
  const updateProfileMutation = useUpdateProfile();
  const deleteProfileMutation = useDeleteProfile();
  const switchProfileMutation = useSwitchProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  // Delete Confirmation State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null);

  // useEffect(() => {
  //   if (isError) {
  //     showToast("Failed to load profiles. Please try again.", "error");
  //   }
  // }, [isError, showToast]);

  const handleOpenAddModal = () => {
    setEditingProfile(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (profile: Profile) => {
    setEditingProfile(profile);
    setIsModalOpen(true);
  };

  const handleSaveProfile = async (data: {
    name: string;
    type: "adult" | "kids";
    imageIndex: number;
  }) => {
    try {
      if (editingProfile) {
        await updateProfileMutation.mutateAsync({
          id: editingProfile._id,
          data,
        });
        showToast("Profile updated successfully", "success");
      } else {
        await createProfileMutation.mutateAsync(data);
        showToast("Profile created successfully", "success");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Failed to save profile:", error);
      showToast(
        error?.response?.data?.message || "Failed to save profile",
        "error"
      );
    }
  };

  const handleDeleteClick = (id: string) => {
    setProfileToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!profileToDelete) return;
    try {
      await deleteProfileMutation.mutateAsync(profileToDelete);
      showToast("Profile deleted successfully", "success");
      setIsDeleteModalOpen(false);
      setProfileToDelete(null);
      setIsEditMode(false);
    } catch (error: any) {
      console.error("Failed to delete profile:", error);
      showToast(
        error?.response?.data?.message || "Failed to delete profile",
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">
        <p>Error loading profiles. Please try again later.</p>
      </div>
    );
  }

  const handleProfileClick = async (profileId: string) => {
    if (isEditMode) return;
    try {
      const response = await switchProfileMutation.mutateAsync(profileId);
      if (response.status) {
        router.push("/home");
      } else {
        showToast(response.message || "Failed to switch profile", "error");
      }
    } catch (error: any) {
      console.error("Failed to switch profile:", error);
      showToast(
        error?.response?.data?.message || "Failed to switch profile",
        "error"
      );
    }
  };

  const profiles = profileData?.profiles || [];

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col font-manrope">
      {/* Header divider */}
      <div className="border-b border-neutral-800" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 sm:py-20">
        <h1 className="text-white text-3xl sm:text-5xl font-bold mb-12 sm:mb-20 tracking-tight text-center px-4">
          Who’s watching?
        </h1>

        {/* Profiles */}
        <div className="flex flex-wrap gap-8 sm:gap-16 items-start justify-center max-w-7xl px-4 sm:px-6">
          {profiles.map((profile) => (
            <div
              key={profile._id}
              className="flex flex-col items-center group relative"
            >
              <div
                className={`w-32 h-32 sm:w-44 sm:h-44 rounded-[30px] sm:rounded-[45px] overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-teal-500/20 bg-gradient-to-br ${
                  AVATAR_COLORS[
                    Math.max(0, (profile.imageIndex || 1) - 1) %
                      AVATAR_COLORS.length
                  ]
                } cursor-pointer`}
                onClick={() => handleProfileClick(profile._id)}
              >
                <User
                  size={40}
                  className="text-white/90 sm:w-[60px] sm:h-[60px]"
                />

                {/* Edit Overlay */}
                {isEditMode && (
                  <div className="absolute inset-0 bg-black/50 h-32 sm:w-44 sm:h-44 rounded-[30px] sm:rounded-[45px] flex items-center justify-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(profile);
                      }}
                      className="p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"
                    >
                      <Pencil size={24} className="text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(profile._id);
                      }}
                      className="p-3 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors cursor-pointer"
                    >
                      <Trash2 size={24} className="text-red-500" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-4 sm:mt-6 text-zinc-400 text-lg sm:text-2xl font-bold group-hover:text-white transition-colors">
                {profile.name}
              </p>
            </div>
          ))}

          {/* Add Profile Button */}
          {!isEditMode && profiles.length < (profileData?.maxProfiles || 5) && (
            <div
              className="flex flex-col items-center group cursor-pointer"
              onClick={handleOpenAddModal}
            >
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-[30px] sm:rounded-[45px] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-105">
                <Plus
                  size={40}
                  className="text-white/30 group-hover:text-white/60 sm:w-[60px] sm:h-[60px]"
                />
              </div>
              <p className="mt-4 sm:mt-6 text-zinc-500 text-lg sm:text-2xl font-bold group-hover:text-white transition-colors">
                Add Profile
              </p>
            </div>
          )}
        </div>

        {/* Profile Limit Message */}
        {!isEditMode && profiles.length >= (profileData?.maxProfiles || 5) && (
          <p className="mt-8 text-zinc-500 text-sm sm:text-base animate-pulse">
            Maximum of {profileData?.maxProfiles || 5} profiles reached.
          </p>
        )}

        {/* Edit Button */}
        <div className="mt-16 sm:mt-24">
          <Button
            variant="outline"
            onClick={() => setIsEditMode(!isEditMode)}
            className="px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl border-zinc-600 text-zinc-400 hover:text-zinc-400 hover:border-white transition-all"
          >
            {isEditMode ? "Done" : "Manage Profiles"}
          </Button>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingProfile={editingProfile}
        onSave={handleSaveProfile}
        isSaving={
          createProfileMutation.isPending || updateProfileMutation.isPending
        }
        avatarColors={AVATAR_COLORS}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Profile?"
        description="This profile's history and My List will be gone forever. You can't undo this."
        okText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={deleteProfileMutation.isPending}
      />

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
