import React from "react";
import { Category } from "./Category";
import { Ratings, Rating } from "./Ratings";

interface MovieInfoSidebarProps {
  releasedYear: string;
  languages: string[];
  genres: string[];
  ratings: Rating[];
  director?: {
    name: string;
    image?: string;
  };
  music?: {
    name: string;
    image?: string;
  };
}

export function MovieInfoSidebar({
  releasedYear,
  languages,
  genres,
  ratings,
  director,
  music,
}: MovieInfoSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Released Year */}
      <InfoBlock title="Released Year" value={releasedYear} />

      {/* Languages */}
      <InfoBlock title="Available Languages">
        {languages.map((lang) => (
          <span
            key={lang}
            className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg"
          >
            {lang}
          </span>
        ))}
      </InfoBlock>

      {/* Ratings */}
      <InfoBlock title="Ratings">
        <Ratings ratings={ratings} />
      </InfoBlock>

      {/* Genres */}
      <InfoBlock title="Genres">
        {genres.map((genre) => (
          <span
            key={genre}
            className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg"
          >
            {genre}
          </span>
        ))}
      </InfoBlock>

      {director && (
        <Category
          title="Director"
          name={director.name}
          country="Director"
          avatar={director.image || "/images/logo.png"}
        />
      )}

      {music && (
        <Category
          title="Music"
          name={music.name}
          country="Music Composer"
          avatar={music.image || "/images/logo.png"}
        />
      )}
    </aside>
  );
}

function InfoBlock({
  title,
  value,
  children,
}: {
  title: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl border border-neutral-800">
      <h4 className="text-neutral-400 text-sm sm:text-base mb-2 sm:mb-3">
        {title}
      </h4>
      {value && <p className="text-lg sm:text-xl font-semibold">{value}</p>}
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
