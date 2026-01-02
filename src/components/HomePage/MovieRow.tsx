"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard, MovieCardProps } from "./MovieCard";
import { Button } from "@/components/Common/Button";

function getVisibleCount(width: number) {
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2; // mobile peek
}

export function MovieRow({
  title,
  items,
}: {
  title: string;
  items: MovieCardProps[];
}) {
  const [visible, setVisible] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const update = () => {
      setVisible(getVisibleCount(window.innerWidth));
      setPage(0);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const step = visible;
  const totalPages = Math.max(1, Math.ceil(items.length / step));
  const maxPage = totalPages - 1;

  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const next = () => setPage((p) => Math.min(p + 1, maxPage));

  return (
    <section className="mt-8 sm:mt-12 md:mt-16">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          {title}
        </h2>

        <div className="flex items-center gap-2 sm:gap-3 bg-neutral-800 rounded-lg p-1">
          <Button
            variant="custom"
            onClick={prev}
            disabled={page === 0}
            className="p-1.5 sm:p-2 md:p-3 rounded-lg text-white disabled:opacity-40 hover:bg-neutral-700 border-none shadow-none"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>

          {/* DOTS (Hidden on very small screens) */}
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 sm:h-2 rounded-full cursor-pointer transition-all border-none shadow-none p-0 ${
                  page === i
                    ? "w-4 sm:w-6 bg-[#25A4AD]"
                    : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <Button
            variant="custom"
            onClick={next}
            disabled={page === maxPage}
            className="p-1.5 sm:p-2 md:p-3 rounded-lg text-white disabled:opacity-40 hover:bg-neutral-700 border-none shadow-none"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${page} * (100% + var(--gap, 16px))))`,
          }}
        >
          {items.map((item, i) => {
            const gap =
              typeof window !== "undefined" && window.innerWidth >= 640
                ? 24
                : 16;
            return (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: `calc((100% - ${(visible - 1) * gap}px) / ${visible})`,
                  ["--gap" as any]: `${gap}px`,
                }}
              >
                <MovieCard id={item.id || i} {...item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
