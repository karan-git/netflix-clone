"use client";
import Footer from "@/components/Footer";
import { Header } from "@/components/HomePage/Header";
import { MovieCard } from "@/components/HomePage/MovieCard";
import { MovieRow } from "@/components/HomePage/MovieRow";
import { Clock, Eye, Mic, Search, SlidersVertical, X } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { Filter, FilterSelections } from "@/components/Search/Filter";
import { BackButton } from "@/components/Common/BackButton";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("Search by Name");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selections, setSelections] = React.useState<FilterSelections>({});

  const onChange = (value: string) => {
    setValue(value);
  };

  const handleSelectFilter = (newSelections: FilterSelections) => {
    setSelections(newSelections);
  };

  const removeFilter = (key: keyof FilterSelections) => {
    const newSelections = { ...selections };
    delete newSelections[key];
    setSelections(newSelections);
  };

  const clearAll = () => {
    setSelections({});
  };

  const activeFilters = Object.entries(selections).filter(
    ([_, val]) => !!val
  ) as [keyof FilterSelections, string][];

  return (
    <section className="w-full font-manrope">
      <div className="flex flex-col px-4 sm:px-6 md:px-12 mt-8 sm:mt-12 gap-4 sm:gap-6">
        <div className="flex relative items-center gap-2 justify-center">
          <BackButton className="absolute left-0" size={24} />
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg flex flex-1 ml-8 xs:ml-0">
            {/* Search icon */}
            <span className="absolute left-4 sm:left-7 top-1/2 -translate-y-1/2 text-neutral-400">
              <Search size={20} />
            </span>

            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="
            w-full h-12 sm:h-14 pl-12 sm:pl-22 pr-16 sm:pr-20
            bg-stone-800 text-white
            rounded-md
            placeholder:text-neutral-400
            focus:outline-none
            focus:ring-2 focus:ring-stone-900/40
            text-sm sm:text-base
          "
            />

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                className="absolute right-10 sm:right-15 cursor-pointer top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-md bg-neutral-800 hover:bg-neutral-700"
                aria-label="Filter"
              >
                <Mic size={18} className="sm:w-5 sm:h-5" />
              </button>
              {/* Divider */}
              <div className="absolute right-9 sm:right-14 top-1/2 -translate-y-1/2 h-5 sm:h-6 w-px bg-white/10" />

              {/* Filter icon */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="absolute right-2 sm:right-3 cursor-pointer top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-md hover:bg-neutral-700"
                aria-label="Filter"
              >
                <SlidersVertical size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ACTIVE FILTERS */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-4">
            <span className="text-stone-400 text-xs sm:text-sm font-medium">
              Active Filters:
            </span>
            {activeFilters.map(([key, val]) => (
              <div
                key={key}
                className="flex items-center gap-1.5 sm:gap-2 bg-zinc-800 border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
              >
                <span className="text-white text-xs sm:text-sm font-medium">
                  <span className="text-stone-500 capitalize">{key}:</span>{" "}
                  {val}
                </span>
                <button
                  onClick={() => removeFilter(key)}
                  className="p-0.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X size={12} className="text-stone-400 hover:text-white" />
                </button>
              </div>
            ))}
            <button
              onClick={clearAll}
              className="text-xs sm:text-sm font-semibold text-[#25A4AD] hover:text-[#1e8a91] transition-colors cursor-pointer ml-1 sm:ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <Filter
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onSelect={handleSelectFilter}
        initialSelections={selections}
      />
      <div className="px-4 sm:px-6 md:px-12 mb-12 mt-8 sm:mt-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          {Array(12)
            .fill({
              image: "/images/movie.png",
              footer: (
                <div className="flex items-center justify-between gap-2 text-[10px] sm:text-xs text-neutral-400">
                  <span className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-neutral-800">
                    <Clock size={12} className="sm:w-3.5 sm:h-3.5" /> 1h 30m
                  </span>
                  <span className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-neutral-800">
                    <Eye size={12} className="sm:w-3.5 sm:h-3.5" /> 2K
                  </span>
                </div>
              ),
            })
            .map((item, i) => (
              <MovieCard key={i} id={item.id || i} {...item} />
            ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}
