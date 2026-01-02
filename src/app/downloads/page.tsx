import Footer from "@/components/Footer";
import { Header } from "@/components/HomePage/Header";
import { DownloadsMovieCard } from "@/components/Downloads/DownloadsMovieCard";

export default function DownloadsPage() {
  return (
    <section className="bg-gray-900 min-h-screen">
      <Header />
      <div className="px-4 sm:px-6 md:px-12 mb-12 mt-6 sm:mt-8">
        <h2 className="text-white text-xl sm:text-3xl lg:text-4xl font-bold">
          Downloaded
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 mt-6">
          {Array(8)
            .fill({
              image: "/images/movie.png",
            })
            .map((item, i) => (
              <DownloadsMovieCard key={i} id={item.id || i} {...item} />
            ))}
        </div>
      </div>
      <Footer />
    </section>
  );
}
