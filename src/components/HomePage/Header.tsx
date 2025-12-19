import { Bell, Search } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between px-12 py-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        {/* <div className="w-14 h-14 rounded-full border-4 border-pink-400 bg-black/30"> */}
        <Image src="/images/logo-icon.png" alt="logo" width={59} height={59} />
        {/* </div> */}
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-4 bg-stone-950 border border-stone-900 rounded-lg px-6 py-2">
        <span className="text-stone-300 text-sm">Home</span>
        <span className="bg-zinc-900 px-4 py-2 rounded-lg text-white text-sm">
          Movies & Shows
        </span>
        <span className="text-stone-300 text-sm">Support</span>
        <span className="text-stone-300 text-sm">Subscriptions</span>
      </nav>

      {/* Actions */}
      <div className="flex gap-4">
        <Search />
        <Bell />
      </div>
    </header>
  );
}
