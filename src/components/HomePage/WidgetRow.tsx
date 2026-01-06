"use client";

import { useWidgetData } from "@/hooks/useHome";
import { MovieRow } from "./MovieRow";
import { Widget } from "@/types/setting";

interface WidgetRowProps {
  widget: Widget;
  isSettingsLoading: boolean;
}

export function WidgetRow({ widget, isSettingsLoading }: WidgetRowProps) {
  const { data: widgetData, isLoading } = useWidgetData(widget._id);

  const items =
    widgetData?.series?.map((item: any) => ({
      id: item._id,
      image: item.thumbnail || item.image || item.poster || "/images/movie.png",
      duration: item.duration,
      views: item.view || item.views,
    })) || [];

  return (
    <div className="sm:px-12 px-4 mb-12">
      <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
        {widget.title}
      </h2>

      {isLoading || isSettingsLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-48 sm:w-64 aspect-[3/4] skeleton-card rounded-xl flex-shrink-0"
              />
            ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-10 text-center text-neutral-500 border border-dashed border-neutral-800 rounded-xl">
          No Record found
        </div>
      ) : (
        <MovieRow title="" items={items} hideTitle />
      )}
    </div>
  );
}
