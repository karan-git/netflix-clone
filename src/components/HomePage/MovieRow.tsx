"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard, MovieCardProps } from "./MovieCard";

function getVisibleCount(width: number) {
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1.25; // mobile peek
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

  const step = Math.floor(visible);
  const totalPages = Math.max(1, Math.ceil(items.length / step));
  const maxPage = totalPages - 1;

  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const next = () => setPage((p) => Math.min(p + 1, maxPage));

  return (
    <section className="mt-16">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 mr-12">
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={page === 0}
            className="p-2 sm:p-3 rounded-lg bg-neutral-800 text-white disabled:opacity-40 hover:bg-neutral-700"
          >
            <ChevronLeft />
          </button>

          {/* DOTS */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all ${
                  page === i
                    ? "w-6 bg-[#25A4AD]"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={page === maxPage}
            className="p-2 sm:p-3 rounded-lg bg-neutral-800 text-white disabled:opacity-40 hover:bg-neutral-700"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(page * 100) / visible}%)`,
          }}
        >
          {items.map((item, i) => (
            <MovieCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
