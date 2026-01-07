"use client";

import React, { useEffect, useState } from "react";
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
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { BackButton } from "@/components/Common/BackButton";
import { SubscriptionStatus } from "@/types/user";
import { Button } from "@/components/Common/Button";

type TabId =
  | "subscription"
  | "profile"
  | "support"
  | "faq"
  | "terms"
  | "history";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("subscription");
  const [notifications, setNotifications] = useState(true);
  const [privateViewing, setPrivateViewing] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const sidebarItems = [
    { id: "subscription", title: "My Subscription", icon: CreditCard },
    { id: "profile", title: "Profile Management", icon: User },
    { id: "support", title: "Support", icon: Headphones },
    { id: "faq", title: "FAQ", icon: HelpCircle },
    { id: "terms", title: "Terms & Conditions", icon: FileText },
    { id: "history", title: "History", icon: History },
  ];

  useEffect(() => {
    if (activeTab === "profile") {
      router.push("/who-is-watching");
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (activeTab === "subscription") {
        setLoading(true);
        try {
          const response = await userService.getSubscriptionStatus();
          if (response.status) {
            setSubscription(response.subscription);
          }
        } catch (error) {
          console.error("Error fetching subscription:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubscription();
  }, [activeTab]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderContent = () => {
    if (activeTab === "subscription") {
      if (loading) {
        return (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
            <p className="text-zinc-400">Loading subscription details...</p>
          </div>
        );
      }

      if (!subscription) {
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertCircle size={48} className="text-zinc-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">No Active Subscription</h3>
            <p className="text-zinc-400 mb-6">
              You don't have an active subscription plan.
            </p>
            <Button variant="primary" size="md">
              View Plans
            </Button>
          </div>
        );
      }

      return (
        <div className="w-full max-w-2xl mx-auto space-y-6 text-left">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {subscription.planId.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      subscription.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {subscription.status}
                  </span>
                  {subscription.autoRenew && (
                    <span className="text-zinc-500 text-xs flex items-center gap-1">
                      <RotateCcw size={12} /> Auto-renews
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-teal-400">
                  ${subscription.planId.price}
                </p>
                <p className="text-zinc-500 text-sm">
                  / {subscription.planId.duration} days
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-300">
                <Calendar size={20} className="text-zinc-500" />
                <div>
                  <p className="text-sm text-zinc-500">Started On</p>
                  <p className="font-medium">
                    {formatDate(subscription.startDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Calendar size={20} className="text-zinc-500" />
                <div>
                  <p className="text-sm text-zinc-500">Expires On</p>
                  <p className="font-medium">
                    {formatDate(subscription.endDate)}
                  </p>
                </div>
              </div>
            </div>

            {subscription.planId.features && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Plan Features
                </h4>
                <ul className="space-y-2">
                  {subscription.planId.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={16} className="text-teal-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="flex-1">
              Upgrade Plan
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-white/10 hover:bg-white/5 text-white"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-6 sm:mb-8">
          {(() => {
            const ActiveIcon =
              sidebarItems.find((i) => i.id === activeTab)?.icon || User;
            return (
              <ActiveIcon size={32} className="text-teal-500 sm:w-12 sm:h-12" />
            );
          })()}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 capitalize">
          {sidebarItems.find((i) => i.id === activeTab)?.title || activeTab}
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg max-w-md">
          Manage your {activeTab} settings and preferences here. This section
          will be updated with more details soon.
        </p>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white overflow-hidden font-manrope">
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-teal-800/5 to-neutral-900 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-16">
        {/* TITLE */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-16">
          <BackButton className="absolute left-0" size={24} />
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Profile
          </h1>
        </div>

        {/* TOP CARD */}
        <div className="mx-auto mb-8 sm:mb-16 flex flex-col sm:flex-row max-w-2xl items-center justify-between rounded-3xl bg-zinc-900/80 backdrop-blur-md px-6 sm:px-10 py-6 sm:py-8 shadow-2xl border border-white/5 gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20 flex-shrink-0">
              <User size={32} className="text-white sm:w-10 sm:h-10" />
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-bold">Current User</p>
              <p className="text-zinc-400 text-sm sm:text-base font-medium">
                {subscription ? subscription.planId.name : "Free Member"}
              </p>
            </div>
          </div>

          <button className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold shadow-lg shadow-teal-500/20 hover:scale-105 transition-transform cursor-pointer">
            Current Plan
            <div className="w-1.5 h-6 bg-white/30 rounded-full hidden sm:block" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
          {/* SIDEBAR */}
          <aside className="lg:col-span-1 rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/5 overflow-hidden shadow-xl">
            <div className="p-2 sm:p-4 space-y-1">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  active={activeTab === item.id}
                  onClick={() => setActiveTab(item.id as TabId)}
                />
              ))}

              <div className="my-3 sm:my-4 h-px bg-white/5 mx-4" />

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

              <div className="my-3 sm:my-4 h-px bg-white/5 mx-4" />

              <SidebarItem
                title="Logout"
                icon={LogOut}
                danger
                onClick={() => authService.logout()}
              />
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="lg:col-span-2 rounded-3xl bg-zinc-900/30 backdrop-blur-sm border border-white/5 p-6 sm:p-12 flex flex-col items-center justify-center text-center shadow-xl min-h-[400px] sm:min-h-[600px]">
            {renderContent()}
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
      className={`w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-2xl transition-all group cursor-pointer ${
        active
          ? "bg-white/10 text-white shadow-inner"
          : danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={`p-2 sm:p-2.5 rounded-xl transition-colors ${
            active
              ? "bg-teal-500 text-white"
              : "bg-zinc-800 group-hover:bg-zinc-700"
          }`}
        >
          <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
        </div>
        <span className="text-base sm:text-lg font-bold tracking-tight">
          {title}
        </span>
      </div>

      {!danger && (
        <ChevronRight
          size={18}
          className={`transition-transform sm:w-5 sm:h-5 ${
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
    <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 group">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors text-zinc-400 group-hover:text-white">
          <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
        </div>
        <span className="text-base sm:text-lg font-bold text-zinc-400 group-hover:text-white transition-colors tracking-tight">
          {title}
        </span>
      </div>

      <button
        onClick={onToggle}
        className={`h-7 sm:h-8 w-12 sm:w-14 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
          enabled ? "bg-teal-500" : "bg-zinc-700"
        }`}
      >
        <div
          className={`h-5 sm:h-6 w-5 sm:w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
            enabled ? "translate-x-5 sm:translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function RotateCcw({ size, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
