"use client";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Image from "next/image";

export default function TrendingSection() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch("/api/trending", { cache: "no-store" });
        const data = await res.json();
        console.log("Trending data:", data);

        setMovies(data.movies || []);
      } catch (err) {
        console.error("Error fetching trending:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    (movie.title || movie.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-bold mb-4 md:mb-0">🔥 Trending Now</h2>
        <input
          type="text"
          placeholder="Search movies..."
          className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader />
      ) : filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {filteredMovies.map((movie) => {
            const imageUrl = movie.poster_path
              ? movie.poster_path.startsWith("http")
                ? movie.poster_path
                : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/fallback-image.png";

            return (
              <div
                key={movie.id || movie.title}
                className="relative group rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition duration-300"
              >
                <Image
                  src={imageUrl}
                  alt={movie.title || movie.name || "Movie"}
                  width={300}
                  height={450}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <p className="text-white text-center text-sm font-semibold px-2">
                    {movie.title || movie.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">No movies found.</p>
      )}
    </section>
  );
}
