"use client";

import { useWidgetData } from "@/hooks/useHome";
import { HeroCarousel } from "./HeroCarousel";
import { Widget } from "@/types/setting";

interface DynamicHeroCarouselProps {
  widget: Widget;
}

export function DynamicHeroCarousel({ widget }: DynamicHeroCarouselProps) {
  const { data: widgetData, isLoading } = useWidgetData(widget._id);

  if (isLoading) {
    return (
      <div className="mx-4 sm:mx-6 md:mx-12 mt-6 sm:mt-12 h-[500px] sm:h-[600px] md:h-[720px] rounded-xl skeleton-card" />
    );
  }

  const slides =
    widgetData?.series?.map((item: any) => ({
      _id: item._id,
      image: item.banner || item.thumbnail || item.image || "/images/image.png",
      title: item.title,
      description: item.description,
      videoUrl: item.videoUrl,
      subtitleUrl: item.subtitleUrl,
      hlsFileName: item.hlsFileName,
      drmEnabled: item.drmEnabled,
      mediaType: item.media_type,
      firstEpisode: item.firstEpisode || item.episode?.[0],
      videoType: item.videoType,
      link: item.link,
    })) || [];

  if (slides.length === 0) {
    return (
      <div className="mx-4 sm:mx-6 md:mx-12 mt-6 sm:mt-12 h-[300px] flex items-center justify-center rounded-xl bg-neutral-900 border border-dashed border-neutral-800 text-neutral-500">
        No Featured Content Found
      </div>
    );
  }

  return <HeroCarousel autoplay={true} interval={5000} slides={slides} />;
}
