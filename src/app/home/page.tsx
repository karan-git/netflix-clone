"use client";

import { Header } from "@/components/HomePage/Header";
import Footer from "@/components/Footer";

import { useSettings } from "@/hooks/useHome";

import { DynamicHeroCarousel } from "@/components/HomePage/DynamicHeroCarousel";
import { WidgetRow } from "@/components/HomePage/WidgetRow";

export default function HomePage() {
  const { data: settingsData, isLoading: isSettingsLoading } = useSettings();

  const widgets = settingsData?.widgets || [];
  const heroWidget = widgets.find((w) => w.type === 1 && w.isActive);
  const rowWidgets = widgets
    .filter((w) => w.type === 3 && w.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="bg-gray-900 min-h-screen">
      <Header />

      {heroWidget && <DynamicHeroCarousel widget={heroWidget} />}

      <div className="mt-12 min-h-[100vh]">
        {rowWidgets.map((widget) => (
          <WidgetRow
            key={widget._id}
            widget={widget}
            isSettingsLoading={isSettingsLoading}
          />
        ))}
      </div>

      <Footer />
    </main>
  );
}
