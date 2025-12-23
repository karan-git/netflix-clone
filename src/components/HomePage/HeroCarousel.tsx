"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  ThumbsUp,
  Volume2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/Common/Button";

interface HeroSlide {
  image: string;
  title: string;
  description: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoplay?: boolean;
  interval?: number; // ms
}

export function HeroCarousel({
  slides,
  autoplay = true,
  interval = 3000,
}: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const next = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const startAutoplay = () => {
    if (!autoplay) return;
    stopAutoplay();
    timerRef.current = setInterval(next, interval);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [current, autoplay, interval]);

  return (
    <section
      className="relative mx-12 mt-12 h-[720px] rounded-xl overflow-hidden"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {/* SLIDES */}
      <div
        className="flex h-full transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative min-w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* VIGNETTE */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at center,
                    rgba(0,0,0,0.05) 0%,
                    rgba(0,0,0,0.4) 60%,
                    rgba(0,0,0,0.75) 100%
                  ),
                  linear-gradient(to bottom,
                    rgba(0,0,0,0) 0%,
                    rgba(0,0,0,0.45) 70%,
                    rgba(0,0,0,0.8) 100%
                  )
                `,
              }}
            />

            {/* CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center z-10">
              <h1 className="text-white text-4xl font-bold">{slide.title}</h1>

              <p className="mt-4 max-w-3xl text-neutral-300">
                {slide.description}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Button
                  variant="custom"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 rounded-lg text-white font-semibold border-none shadow-none"
                >
                  ▶ Play Now
                </Button>

                <IconButton>
                  <Plus />
                </IconButton>
                <IconButton>
                  <ThumbsUp />
                </IconButton>
                <IconButton>
                  <Volume2 />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ARROWS */}
      <Button
        variant="custom"
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-3 rounded-full hover:bg-black/70 border-none shadow-none"
      >
        <ChevronLeft className="text-white" />
      </Button>

      <Button
        variant="custom"
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-3 rounded-full hover:bg-black/70 border-none shadow-none"
      >
        <ChevronRight className="text-white" />
      </Button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant="custom"
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all border-none shadow-none p-0 ${
              current === index ? "w-8 bg-[#25A4AD]" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* Icon Button */
function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="custom"
      className="p-3 bg-black/60 border border-neutral-700 rounded-lg hover:bg-black/80 text-white shadow-none"
    >
      {children}
    </Button>
  );
}
