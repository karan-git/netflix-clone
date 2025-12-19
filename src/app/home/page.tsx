import { Header } from "@/components/HomePage/Header";
import { MovieRow } from "@/components/HomePage/MovieRow";
import Footer from "@/components/Footer";
import { HeroCarousel } from "@/components/HomePage/HeroCarousel";

export default function HomePage() {
  return (
    <main className="bg-gray-900 min-h-screen">
      <Header />
      <HeroCarousel
        autoplay={true}
        interval={3000}
        slides={[
          {
            image: "/images/image.png",
            title: "Avengers : Endgame",
            description:
              "Lorem ipsum dolor sit amet consectetur. Scelerisque diam porta nisi massa etiam.",
          },
          {
            image: "/images/hero-2.jpg",
            title: "Spider-Man : No Way Home",
            description:
              "Eu pellentesque integer dui turpis aliquam sollicitudin consectetur.",
          },
        ]}
      />

      <div className="px-12 pr-0 mb-12">
        <MovieRow
          title="Top 10 Trending"
          items={Array(8).fill({
            image: "/images/movie.png",
            duration: "1h 30min",
            views: "2K",
          })}
        />

        <MovieRow
          title="New Releases"
          items={Array(8).fill({
            image: "/images/movie.png",
            footer: (
              <div className="text-center text-neutral-400">
                Released at{" "}
                <span className="text-stone-300">14 April 2023</span>
              </div>
            ),
          })}
        />
      </div>

      <Footer />
    </main>
  );
}
