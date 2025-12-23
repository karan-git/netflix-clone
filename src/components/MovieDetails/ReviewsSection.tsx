"use client";

import React, { useEffect, useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/Common/Button";
import { Ratings } from "./Ratings";

interface Review {
  name: string;
  location: string;
  content: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

function getVisibleCount(width: number) {
  if (width >= 768) return 2;
  return 1;
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [visible, setVisible] = useState(2);
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
  const totalPages = Math.max(1, Math.ceil(reviews.length / step));
  const maxPage = totalPages - 1;

  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const next = () => setPage((p) => Math.min(p + 1, maxPage));

  return (
    <div className="bg-zinc-900 p-8 rounded-xl border border-neutral-800 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-neutral-400">Reviews</h3>

        <Button
          variant="custom"
          className="px-4 py-2 border border-neutral-800 rounded-lg hover:bg-zinc-800 transition-colors"
          leftIcon={<Plus size={18} />}
          size="md"
        >
          Add Review
        </Button>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(page * 100) / visible}%)`,
          }}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                width: `calc((100% - ${(visible - 1) * 24}px) / ${visible})`,
              }}
            >
              <div className="bg-stone-950 p-6 rounded-xl border border-neutral-800 h-full">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h4 className="text-xl font-medium">{review.name}</h4>
                    <p className="text-neutral-400">{review.location}</p>
                  </div>
                  <Ratings ratings={[{ value: 4.5 }]} />
                </div>
                <p className="mt-4 text-neutral-400">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-3">
        <Button
          variant="custom"
          onClick={prev}
          disabled={page === 0}
          className="p-3 rounded-full border border-neutral-800 bg-stone-950 hover:bg-zinc-800 transition-colors disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </Button>

        {/* DOTS */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant="custom"
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all border-none shadow-none p-0 ${
                page === i
                  ? "w-4 bg-[#25A4AD]"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <Button
          variant="custom"
          onClick={next}
          disabled={page === maxPage}
          className="p-3 rounded-full border border-neutral-800 bg-stone-950 hover:bg-zinc-800 transition-colors disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
}
