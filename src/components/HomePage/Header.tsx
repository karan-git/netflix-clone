"use client";

import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies & Shows", path: "/movies" },
    { name: "Support", path: "/support" },
    { name: "Subscriptions", path: "/subscriptions" },
  ];

  return (
    <header className="flex items-center justify-between px-12 py-6">
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src="/images/logo-icon.png" alt="logo" width={59} height={59} />
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-4 bg-stone-950 border border-stone-900 rounded-lg px-6 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex gap-4">
        <Search className="cursor-pointer text-stone-300 hover:text-white" />
        <Bell className="cursor-pointer text-stone-300 hover:text-white" />
      </div>
    </header>
  );
}
