"use client";

import { Clock, Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface MovieCardProps {
  id?: string | number;
  image: string;
  duration?: string;
  views?: string;
  footer?: any;
}

export function MovieCard({
  id,
  image,
  duration,
  views,
  footer,
}: MovieCardProps) {
  const router = useRouter();
  return (
    <div
      className="
        flex-shrink-0
        bg-zinc-900 border border-neutral-800 rounded-xl
        p-3 sm:p-4
        flex flex-col gap-3 sm:gap-4
        transition-all duration-300 ease-in-out
        hover:scale-102 hover:shadow-2xl hover:shadow-black/50
      "
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
        <Image
          onClick={() => router.push(`/movie/${id}`)}
          src={image}
          alt="movie"
          fill
          className="object-cover cursor-pointer"
          sizes="
            (max-width: 640px) 50vw,
            (max-width: 768px) 33vw,
            (max-width: 1024px) 25vw,
            (max-width: 1280px) 20vw,
            15vw
          "
          priority={false}
        />
      </div>

      {/* META */}
      {(duration || views) && (
        <div className="flex justify-between text-xs sm:text-sm">
          {duration && (
            <span className="px-2 py-1 bg-neutral-900 rounded-full text-neutral-400 flex items-center gap-2">
              <Clock /> <span className="text-nowrap">{duration}</span>
            </span>
          )}
          {views && (
            <span className="px-2 py-1 bg-neutral-900 rounded-full text-neutral-400 flex items-center gap-2">
              <Eye /> {views}
            </span>
          )}
        </div>
      )}

      {/* FOOTER */}
      {footer}
    </div>
  );
}
