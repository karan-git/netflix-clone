import Footer from "@/components/Footer";
import { Header } from "@/components/HomePage/Header";
import { MovieCard } from "@/components/HomePage/MovieCard";
import { MovieRow } from "@/components/HomePage/MovieRow";
import { Clock, Download, Eye, Trash2 } from "lucide-react";

export default function WatchlistPage() {
  return (
    <section className="bg-gray-900 min-h-screen">
      <Header />
      <div className="px-12 pr-0 mb-12 mt-6">
        <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
          Watchlist
        </h2>
        <div className="relative overflow-hidden flex gap-4 sm:gap-8 flex-wrap mt-6">
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
                  <Download />
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
