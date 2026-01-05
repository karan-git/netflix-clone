"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import LandingPage from "@/components/LandingPage";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  const handleSplashFinish = () => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/home");
    } else {
      setShowSplash(false);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <LandingPage />
      )}
    </main>
  );
}
