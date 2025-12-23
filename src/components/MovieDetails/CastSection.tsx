"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/Common/Button";
import Image from "next/image";

interface CastMember {
  name: string;
  image: string;
}

interface CastSectionProps {
  cast: CastMember[];
}

function getVisibleCount(width: number) {
  if (width >= 1024) return 8;
  if (width >= 768) return 4;
  if (width >= 640) return 2;
  return 2;
}

export function CastSection({ cast }: CastSectionProps) {
  const [visible, setVisible] = useState(8);
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
  const totalPages = Math.max(1, Math.ceil(cast.length / step));
  const maxPage = totalPages - 1;

  const prev = () => setPage((p) => Math.max(p - 1, 0));
  const next = () => setPage((p) => Math.min(p + 1, maxPage));

  return (
    <div className="bg-zinc-900 p-8 rounded-xl border border-neutral-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-neutral-400">Cast</h3>
        <div className="flex items-center gap-3 bg-stone-950 p-2 rounded-lg border border-neutral-800">
          <Button
            variant="custom"
            onClick={prev}
            disabled={page === 0}
            className="p-2 rounded-full border border-neutral-800 hover:bg-zinc-800 transition-colors disabled:opacity-40"
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
            className="p-2 rounded-full border border-neutral-800 hover:bg-zinc-800 transition-colors disabled:opacity-40"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(page * 100) / visible}%)`,
          }}
        >
          {cast.map((member, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{
                width: `calc((100% - ${(visible - 1) * 16}px) / ${visible})`,
              }}
            >
              <Image
                width={100}
                height={100}
                src={member.image}
                alt={member.name}
                className="rounded-xl w-full h-auto object-cover "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
