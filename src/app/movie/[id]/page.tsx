"use client";
import React, { use } from "react";
import { Header } from "@/components/HomePage/Header";
import Footer from "@/components/Footer";
import { HeroCarousel } from "@/components/HomePage/HeroCarousel";
import { DescriptionSection } from "@/components/MovieDetails/DescriptionSection";
import { CastSection } from "@/components/MovieDetails/CastSection";
import { ReviewsSection } from "@/components/MovieDetails/ReviewsSection";
import { MovieInfoSidebar } from "@/components/MovieDetails/MovieInfoSidebar";
import { SeasonsAndEpisodes } from "@/components/MovieDetails/Shows";
import { MovieRow } from "@/components/HomePage/MovieRow";
import { useMovieDetails } from "@/hooks/useMovie";
import { Loader2 } from "lucide-react";

export default function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    data: movieResponse,
    isLoading,
    error,
  } = useMovieDetails("695b7026a36d8682231b8ec0");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#E50914] animate-spin" />
      </div>
    );
  }

  if (error || !movieResponse?.movie?.[0]) {
    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Error loading movie details</h1>
        <p className="text-neutral-400">Please try again later.</p>
      </div>
    );
  }

  const movie = movieResponse.movie[0];
  console.log("MovieDetailsPage: movie data:", movie);

  // Map movie data to HeroCarousel slides
  const slides = [
    {
      _id: movie._id,
      image: movie.image || "/images/movie.png",
      title: movie.title,
      description: movie.description,
      videoUrl: movie.link,
      hlsFileName: movie.hlsFileName,
      drmEnabled: movie.drmEnabled,
      mediaType: movie.media_type,
      firstEpisode: movie.firstEpisode || movie.episode?.[0],
      videoType: movie.videoType,
      link: movie.link,
    },
  ];

  // Map cast data
  const cast =
    movie.cast?.map((member) => ({
      name: member.name,
      image: member.image || "/images/movie.png",
    })) || [];

  // Map reviews data
  const reviews =
    movie.reviews?.map((review) => ({
      name: review.userName,
      location: "Verified User",
      content: review.comment,
    })) || [];

  // Map ratings data
  const ratings = [
    { title: "IMDb", value: movie.contentRating || 0 },
    // { title: "Maturity", value: movie.maturity || "G" },
  ].filter((r) => r.value !== 0);
  // Map seasons data
  const seasons =
    movie.season?.map((s) => ({
      season: s.seasonNumber,
      episodes: (movie.episode || [])
        .filter((ep) => ep.seasonNumber === s.seasonNumber)
        .map((ep) => ({
          _id: ep._id,
          id: ep.episodeNumber,
          title: ep.name,
          description: ep.description || "",
          duration: ep.duration || "",
          image: ep.image,
          videoType: ep.videoType,
          videoUrl: ep.videoUrl,
          link: ep.link,
          hlsFileName: ep.hlsFileName,
          drmEnabled: ep.drmEnabled,
        })),
    })) || [];

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-manrope">
      <Header />

      <HeroCarousel slides={slides} />

      <section className="mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 sm:mt-12 mb-12">
        <div className="lg:col-span-2 space-y-8">
          {(movie.media_type === "series" || movie.media_type === "tv") &&
            seasons.length > 0 && <SeasonsAndEpisodes seasons={seasons} />}

          <DescriptionSection description={movie.description} />
          {cast.length > 0 && <CastSection cast={cast} />}
          {reviews.length > 0 && <ReviewsSection reviews={reviews} />}
        </div>

        <MovieInfoSidebar
          releasedYear={new Date(movie.year).getFullYear().toString()}
          languages={[]} // Genre/Language are IDs, skipping for now or need mapping
          genres={[]}
          ratings={ratings as any}
          director={movie.director}
          music={movie.music}
        />
      </section>

      {/* <div className="mb-12 px-4 sm:px-6 md:px-12">
        <MovieRow
          title="Recommended"
          items={Array(8).fill({
            image: "/images/movie.png",
            footer: (
              <div className="text-center text-neutral-400 text-sm">
                Released at{" "}
                <span className="text-stone-300">
                  {new Date(movie.year).toLocaleDateString()}
                </span>
              </div>
            ),
          })}
        />
      </div> */}

      <Footer />
    </div>
  );
}
