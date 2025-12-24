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
      <div className="flex flex-col px-12 mt-12 gap-6">
        <div className="flex relative items-center gap-2 justify-center">
          <BackButton className="absolute left-0" size={28} />
          <div className="relative max-w-lg flex flex-1">
            {/* Search icon */}
            <span className="absolute left-7 top-1/2 -translate-y-1/2 ">
              <Search />
            </span>

            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="
            w-full h-14 pl-22 pr-20
            bg-stone-800 text-white
            rounded-md
            placeholder:text-neutral-400
            focus:outline-none
            focus:ring-2 focus:ring-stone-900/40
          "
            />

            <div className="flex items-center gap-2">
              {/* <Mic className=" cursor-pointer" /> */}
              <button
                type="button"
                className="absolute right-15 cursor-pointer top-1/2 -translate-y-1/2 p-2 rounded-md bg-neutral-800 hover:bg-neutral-700"
                aria-label="Filter"
              >
                <Mic />
              </button>
              {/* Divider */}
              <div className="absolute right-14 top-1/2 -translate-y-1/2 h-6 w-px bg-white/10" />

              {/* Filter icon */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-neutral-700"
                aria-label="Filter"
              >
                <SlidersVertical />
              </button>
            </div>
          </div>
        </div>

        {/* ACTIVE FILTERS */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <span className="text-stone-400 text-sm font-medium mr-2">
              Active Filters:
            </span>
            {activeFilters.map(([key, val]) => (
              <div
                key={key}
                className="flex items-center gap-2 bg-zinc-800 border border-white/10 px-4 py-2 rounded-full"
              >
                <span className="text-white text-sm font-medium">
                  <span className="text-stone-500 capitalize">{key}:</span>{" "}
                  {val}
                </span>
                <button
                  onClick={() => removeFilter(key)}
                  className="p-0.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X size={14} className="text-stone-400 hover:text-white" />
                </button>
              </div>
            ))}
            <button
              onClick={clearAll}
              className="text-sm font-semibold text-[#25A4AD] hover:text-[#1e8a91] transition-colors cursor-pointer ml-2"
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
      <div className="px-12 pr-0 mb-12 mt-14">
        <div className="relative overflow-hidden flex gap-4 sm:gap-8 flex-wrap">
          {Array(8)
            .fill({
              image: "/images/movie.png",
              footer: (
                <div className="flex items-center justify-between gap-2 text-sm text-neutral-400">
                  <span className="flex items-center gap-2 px-2 py-1 rounded-full bg-neutral-800">
                    <Clock /> 1h 30min
                  </span>
                  <span className="flex items-center gap-2 px-2 py-1 rounded-full bg-neutral-800">
                    <Eye /> 2K
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
