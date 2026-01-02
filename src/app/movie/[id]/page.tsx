import React from "react";
import { Header } from "@/components/HomePage/Header";
import Footer from "@/components/Footer";
import { HeroCarousel } from "@/components/HomePage/HeroCarousel";
import { DescriptionSection } from "@/components/MovieDetails/DescriptionSection";
import { CastSection } from "@/components/MovieDetails/CastSection";
import { ReviewsSection } from "@/components/MovieDetails/ReviewsSection";
import { MovieInfoSidebar } from "@/components/MovieDetails/MovieInfoSidebar";
import { SeasonsAndEpisodes } from "@/components/MovieDetails/Shows";
import { MovieRow } from "@/components/HomePage/MovieRow";

const DUMMY_SLIDES = [
  {
    image: "/images/movie.png",
    title: "Kantara",
    description:
      "A fiery young man clashes with an unflinching forest officer in a south Indian village where spirituality, fate and folklore rule the lands.",
  },
  {
    image: "/images/movie.png",
    title: "The Legend of Kantara",
    description:
      "Experience the epic battle between man and nature in this spiritual thriller.",
  },
  {
    image: "/images/movie.png",
    title: "Spiritual Roots",
    description:
      "Delve deep into the folklore and traditions of the coastal Karnataka region.",
  },
];

const DUMMY_MOVIE_DATA = {
  description:
    "A fiery young man clashes with an unflinching forest officer in a south Indian village where spirituality, fate and folklore rule the lands.",
  cast: Array.from({ length: 8 }).map((_, i) => ({
    name: `Cast Member ${i + 1}`,
    image: "/images/movie.png",
  })),
  reviews: [
    {
      name: "Aniket Roy",
      location: "From India",
      content:
        "This movie was recommended to me by a very dear friend who went for the movie by herself.",
    },
    {
      name: "Swaraj",
      location: "From India",
      content:
        "This movie was recommended to me by a very dear friend who went for the movie by herself.",
    },
  ],
  releasedYear: "2022",
  languages: ["English", "Hindi", "Tamil", "Telugu", "Kannada"],
  genres: ["Action", "Adventure"],
  ratings: [
    { title: "IMDb", value: 4.5 },
    { title: "Streamvibe", value: 4.0 },
  ],
};

export default function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-manrope">
      <Header />

      <HeroCarousel slides={DUMMY_SLIDES} />

      <section className="mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 sm:mt-12 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <SeasonsAndEpisodes
            seasons={[
              {
                season: 1,
                episodes: Array.from({ length: 9 }).map((_, i) => ({
                  id: i + 1,
                  title: `Episode ${i + 1}`,
                  description: "Episode description goes here.",
                  duration: "52 min",
                })),
              },
              {
                season: 2,
                episodes: [
                  {
                    id: 1,
                    title: "Chapter One: The Vanishing of Will Byers",
                    description:
                      "On his way from a friend’s house, young Will sees something terrifying.",
                    duration: "49 min",
                  },
                  {
                    id: 2,
                    title: "Chapter Two: The Weirdo on Maple Street",
                    description:
                      "Lucas, Mike and Dustin try to talk to the girl they found.",
                    duration: "56 min",
                  },
                ],
              },
            ]}
          />

          <DescriptionSection description={DUMMY_MOVIE_DATA.description} />
          <CastSection cast={DUMMY_MOVIE_DATA.cast} />
          <ReviewsSection reviews={DUMMY_MOVIE_DATA.reviews} />
        </div>

        <MovieInfoSidebar
          releasedYear={DUMMY_MOVIE_DATA.releasedYear}
          languages={DUMMY_MOVIE_DATA.languages}
          genres={DUMMY_MOVIE_DATA.genres}
          ratings={DUMMY_MOVIE_DATA.ratings}
        />
      </section>
      <div className="mb-12 px-4 sm:px-6 md:px-12">
        <MovieRow
          title="Recommended"
          items={Array(8).fill({
            image: "/images/movie.png",
            footer: (
              <div className="text-center text-neutral-400 text-sm">
                Released at{" "}
                <span className="text-stone-300">14 April 2023</span>
              </div>
            ),
          })}
        />
      </div>

      <Footer />
    </div>
  );
}
