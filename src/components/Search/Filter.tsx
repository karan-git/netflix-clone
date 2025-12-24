"use client";

import { ChevronDown, X } from "lucide-react";
import React, { useState } from "react";

export interface FilterSelections {
  year?: string;
  genre?: string;
  language?: string;
}

interface FilterProps {
  open: boolean;
  onClose: () => void;
  onSelect: (selections: FilterSelections) => void;
  initialSelections?: FilterSelections;
}

const YEARS = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017"];
const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Thriller",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Mystery",
  "Crime",
  "Animation",
  "Family",
  "Kids",
  "Musical",
  "Documentary",
  "Biography",
  "Historical",
  "War",
];
const LANGUAGES = [
  "English",
  "Hindi",
  "Arabic",
  "Tamil",
  "Telugu",
  "Kannada",
  "Spanish",
  "French",
];

type Category = "Year" | "Genre" | "Language";

export function Filter({
  open,
  onClose,
  onSelect,
  initialSelections,
}: FilterProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("Genre");
  const [selections, setSelections] = useState<FilterSelections>(
    initialSelections || {}
  );

  React.useEffect(() => {
    setSelections(initialSelections || {});
  }, [initialSelections]);

  if (!open) return null;

  const handleSelect = (category: Category, value: string) => {
    const newSelections = { ...selections };
    if (category === "Year") newSelections.year = value;
    if (category === "Genre") newSelections.genre = value;
    if (category === "Language") newSelections.language = value;

    setSelections(newSelections);
    onSelect(newSelections);
  };

  const categories: Category[] = ["Year", "Genre", "Language"];

  const getOptions = () => {
    if (activeCategory === "Year") return YEARS;
    if (activeCategory === "Genre") return GENRES;
    if (activeCategory === "Language") return LANGUAGES;
    return [];
  };

  const getSelectedValue = (cat: Category) => {
    if (cat === "Year") return selections.year;
    if (cat === "Genre") return selections.genre;
    if (cat === "Language") return selections.language;
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-manrope">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-hidden bg-zinc-900/50 border border-white/10 rounded-3xl flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/5">
          <h2 className="text-3xl font-bold text-white">Filters</h2>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-6 justify-center">
            {categories.map((cat) => {
              const selected = getSelectedValue(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-4 px-8 py-4 rounded-full border transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-zinc-800/50 text-white border-white/10 hover:border-white/30"
                  }`}
                >
                  <span className="text-xl font-semibold">
                    {selected || cat}
                  </span>
                  <Chevron rotated={isActive} dark={isActive} />
                </button>
              );
            })}
          </div>

          {/* OPTIONS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[400px] overflow-y-auto content-start pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {getOptions().map((option) => {
              const isSelected = getSelectedValue(activeCategory) === option;
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(activeCategory, option)}
                  className={`px-6 py-4 rounded-xl text-lg font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#25A4AD] text-white border-[#25A4AD] shadow-[0_0_20px_rgba(37,164,173,0.3)]"
                      : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-10 py-8 border-t border-white/5 flex justify-end gap-4">
          <button
            onClick={() => {
              setSelections({});
              onSelect({});
            }}
            className="px-8 py-4 rounded-xl text-lg font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="px-10 py-4 rounded-xl text-lg font-semibold bg-[#25A4AD] text-white hover:bg-[#1e8a91] transition-colors cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

function Chevron({ rotated, dark }: { rotated: boolean; dark?: boolean }) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
        rotated ? "rotate-180" : ""
      } ${dark ? "bg-black/10" : "bg-white/10"}`}
    >
      <ChevronDown size={18} />
    </div>
  );
}
