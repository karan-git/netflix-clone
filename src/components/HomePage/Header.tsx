"use client";

import { Bell, Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Movies & Shows", path: "/movies" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Downloads", path: "/downloads" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-6 relative z-50">
      {/* Logo & Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <Image
            src="/images/logo-icon.png"
            alt="logo"
            width={40}
            height={40}
            className="w-10 h-10 md:w-[59px] md:h-[59px]"
          />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4 bg-stone-950 border border-stone-900 rounded-lg px-6 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? "bg-zinc-700 text-white"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex gap-4 md:gap-6">
        <Search
          className="cursor-pointer text-stone-300 hover:text-white"
          onClick={() => router.push("/search")}
        />
        <Bell className="cursor-pointer text-stone-300 hover:text-white" />
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-stone-950 border-r border-stone-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <Image
              src="/images/logo-icon.png"
              alt="logo"
              width={40}
              height={40}
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-stone-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-stone-300 hover:bg-stone-900 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
