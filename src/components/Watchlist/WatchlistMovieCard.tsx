"use client";

import { Clock, Download, Eye } from "lucide-react";
import { MovieCard } from "../HomePage/MovieCard";

interface WatchlistMovieCardProps {
  id?: string | number;
  image: string;
  duration?: string;
  views?: string;
}

export function WatchlistMovieCard({
  id,
  image,
  duration = "1h 30min",
  views = "2K",
}: WatchlistMovieCardProps) {
  return (
    <MovieCard
      id={id}
      image={image}
      footer={
        <div className="flex items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-neutral-400">
          <span className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-neutral-800">
            <Clock size={12} className="sm:w-4 sm:h-4" /> {duration}
          </span>
          <span className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-neutral-800">
            <Eye size={12} className="sm:w-4 sm:h-4" /> {views}
          </span>
          <span
            className="cursor-pointer hover:bg-stone-700 p-1.5 sm:p-2 rounded-full"
            onClick={() => {
              console.log("Download");
            }}
          >
            <Download size={16} className="sm:w-5 sm:h-5" />
          </span>
        </div>
      }
    />
  );
}
