"use client";

import React, { useState } from "react";
import {
  CreditCard,
  User,
  Headphones,
  HelpCircle,
  FileText,
  Bell,
  History,
  EyeOff,
  LogOut,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { BackButton } from "@/components/Common/BackButton";

type TabId =
  | "subscription"
  | "profile"
  | "support"
  | "faq"
  | "terms"
  | "history";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [notifications, setNotifications] = useState(true);
  const [privateViewing, setPrivateViewing] = useState(false);

  const sidebarItems = [
    { id: "subscription", title: "My Subscription", icon: CreditCard },
    { id: "profile", title: "Profile Management", icon: User },
    { id: "support", title: "Support", icon: Headphones },
    { id: "faq", title: "FAQ", icon: HelpCircle },
    { id: "terms", title: "Terms & Conditions", icon: FileText },
    { id: "history", title: "History", icon: History },
  ];

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white overflow-hidden font-manrope">
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-teal-800/5 to-neutral-900 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* TITLE */}
        <div className="relative flex items-center justify-center mb-16">
          <BackButton className="absolute left-0" size={28} />
          <h1 className="text-5xl font-bold tracking-tight">Profile</h1>
        </div>

        {/* TOP CARD */}
        <div className="mx-auto mb-16 flex max-w-2xl items-center justify-between rounded-3xl bg-zinc-900/80 backdrop-blur-md px-10 py-8 shadow-2xl border border-white/5">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <User size={40} className="text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold">Current User</p>
              <p className="text-zinc-400 font-medium">Premium Member</p>
            </div>
          </div>

          <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-8 py-4 text-xl font-bold shadow-lg shadow-teal-500/20 hover:scale-105 transition-transform cursor-pointer">
            Current Plan
            <div className="w-1.5 h-6 bg-white/30 rounded-full" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* SIDEBAR */}
          <aside className="lg:col-span-1 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/5 overflow-hidden shadow-xl">
            <div className="p-4 space-y-1">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  active={activeTab === item.id}
                  onClick={() => setActiveTab(item.id as TabId)}
                />
              ))}

              <div className="my-4 h-px bg-white/5 mx-4" />

              <ToggleItem
                title="Notifications"
                icon={Bell}
                enabled={notifications}
                onToggle={() => setNotifications(!notifications)}
              />
              <ToggleItem
                title="Private Viewing"
                icon={EyeOff}
                enabled={privateViewing}
                onToggle={() => setPrivateViewing(!privateViewing)}
              />

              <div className="my-4 h-px bg-white/5 mx-4" />

              <SidebarItem
                title="Logout"
                icon={LogOut}
                danger
                onClick={() => authService.logout()}
              />
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="lg:col-span-2 rounded-3xl bg-zinc-900/30 backdrop-blur-sm border border-white/5 p-12 flex flex-col items-center justify-center text-center shadow-xl min-h-[600px]">
            <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-8">
              {(() => {
                const ActiveIcon =
                  sidebarItems.find((i) => i.id === activeTab)?.icon || User;
                return <ActiveIcon size={48} className="text-teal-500" />;
              })()}
            </div>
            <h2 className="text-3xl font-bold mb-4 capitalize">
              {sidebarItems.find((i) => i.id === activeTab)?.title || activeTab}
            </h2>
            <p className="text-zinc-400 text-lg max-w-md">
              Manage your {activeTab} settings and preferences here. This
              section will be updated with more details soon.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

interface SidebarItemProps {
  title: string;
  icon: LucideIcon;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

function SidebarItem({
  title,
  icon: Icon,
  active,
  danger,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group cursor-pointer ${
        active
          ? "bg-white/10 text-white shadow-inner"
          : danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2.5 rounded-xl transition-colors ${
            active
              ? "bg-teal-500 text-white"
              : "bg-zinc-800 group-hover:bg-zinc-700"
          }`}
        >
          <Icon size={22} />
        </div>
        <span className="text-lg font-bold tracking-tight">{title}</span>
      </div>

      {!danger && (
        <ChevronRight
          size={20}
          className={`transition-transform ${
            active
              ? "translate-x-1 text-teal-500"
              : "text-zinc-600 group-hover:text-zinc-400"
          }`}
        />
      )}
    </button>
  );
}

interface ToggleItemProps {
  title: string;
  icon: LucideIcon;
  enabled: boolean;
  onToggle: () => void;
}

function ToggleItem({ title, icon: Icon, enabled, onToggle }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 group">
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors text-zinc-400 group-hover:text-white">
          <Icon size={22} />
        </div>
        <span className="text-lg font-bold text-zinc-400 group-hover:text-white transition-colors tracking-tight">
          {title}
        </span>
      </div>

      <button
        onClick={onToggle}
        className={`h-8 w-14 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
          enabled ? "bg-teal-500" : "bg-zinc-700"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
