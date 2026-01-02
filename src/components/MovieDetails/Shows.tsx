"use client";
import { ArrowDown } from "lucide-react";
import React, { useState } from "react";

interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
}

interface Season {
  season: number;
  episodes: Episode[];
}

interface SeasonsAndEpisodesProps {
  seasons: Season[];
}

export function SeasonsAndEpisodes({ seasons }: SeasonsAndEpisodesProps) {
  const [openSeason, setOpenSeason] = useState<number | null>(2);

  return (
    <section className="bg-zinc-900 rounded-xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-10 border border-neutral-800">
      <h2 className="text-xl sm:text-2xl font-semibold">
        Seasons and Episodes
      </h2>

      {seasons.map((season) => {
        const isOpen = openSeason === season.season;

        return (
          <div key={season.season} className="space-y-4 sm:space-y-5">
            {/* Season Header */}
            <button
              onClick={() => setOpenSeason(isOpen ? null : season.season)}
              className="w-full px-4 sm:px-8 cursor-pointer py-4 sm:py-6 bg-stone-950 rounded-xl border border-neutral-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <h3 className="text-lg sm:text-2xl font-semibold">
                  Season {String(season.season).padStart(2, "0")}
                </h3>
                <span className="text-neutral-400 text-sm sm:text-base">
                  {season.episodes.length} Episodes
                </span>
              </div>

              <Chevron rotated={isOpen} />
            </button>

            {/* Episodes */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100 mt-4 sm:mt-5"
                  : "grid-rows-[0fr] opacity-0 mt-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="bg-stone-950 rounded-xl border border-neutral-800 p-4 sm:p-8 space-y-6 sm:space-y-8">
                  {season.episodes.map((ep) => (
                    <EpisodeRow key={ep.id} episode={ep} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function EpisodeRow({ episode }: { episode: any }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 sm:py-8 border-b border-neutral-800 last:border-b-0">
      <div className="flex items-center gap-4 sm:block">
        {/* Episode Number */}
        <div className="w-8 sm:w-12 text-neutral-400 text-xl sm:text-3xl font-semibold">
          {String(episode.id).padStart(2, "0")}
        </div>

        {/* Thumbnail */}
        <div className="w-32 sm:w-44 h-20 sm:h-28 bg-black/50 rounded-xl border border-neutral-800 flex items-center justify-center flex-shrink-0">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black/60 rounded-full flex items-center justify-center text-xs sm:text-base">
            ▶
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-2 sm:space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-lg sm:text-xl font-semibold">{episode.title}</h4>

          <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-neutral-400 bg-neutral-900 border border-neutral-800 rounded-lg whitespace-nowrap">
            {episode.duration}
          </span>
        </div>

        <p className="text-neutral-400 text-sm sm:text-base line-clamp-3 sm:line-clamp-none">
          {episode.description}
        </p>
      </div>
    </div>
  );
}

function Chevron({ rotated }: { rotated: boolean }) {
  return (
    <div
      className={`w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-transform ${
        rotated ? "rotate-180" : ""
      }`}
    >
      <ArrowDown size={20} />
    </div>
  );
}
