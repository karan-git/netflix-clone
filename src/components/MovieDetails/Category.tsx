import React from "react";

interface CategoryProps {
  title: string;
  name: string;
  country: string;
  avatar: string;
}

export function Category({ title, name, country, avatar }: CategoryProps) {
  return (
    <div className="space-y-3 ">
      <p className="text-neutral-400 text-lg font-medium">{title}</p>

      <div className="flex items-center gap-4 p-4 bg-zinc-900 border border-neutral-800 rounded-lg">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-lg object-cover"
        />

        <div className="flex flex-col">
          <p className="text-white text-lg font-medium">{name}</p>
          <p className="text-neutral-400 text-sm">From {country}</p>
        </div>
      </div>
    </div>
  );
}
