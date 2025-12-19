import Image from "next/image";

interface MovieCardProps {
  image: string;
  duration?: string;
  views?: string;
  footer?: React.ReactNode;
}

export function MovieCard({ image, duration, views, footer }: MovieCardProps) {
  return (
    <div
      className="
        flex-shrink-0
        bg-zinc-900 border border-neutral-800 rounded-xl
        p-4 sm:p-5 lg:p-6
        flex flex-col gap-4
        w-[72vw]
        sm:w-[300px]
        md:w-[280px]
        lg:w-[260px]
      "
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt="movie"
          fill
          className="object-cover"
          sizes="
            (max-width: 640px) 72vw,
            (max-width: 1024px) 280px,
            240px
          "
          priority={false}
        />
      </div>

      {/* META */}
      {(duration || views) && (
        <div className="flex justify-between text-xs sm:text-sm">
          {duration && (
            <span className="px-2 py-1 bg-neutral-900 rounded-full text-neutral-400">
              {duration}
            </span>
          )}
          {views && (
            <span className="px-2 py-1 bg-neutral-900 rounded-full text-neutral-400">
              {views}
            </span>
          )}
        </div>
      )}

      {/* FOOTER */}
      {footer}
    </div>
  );
}
