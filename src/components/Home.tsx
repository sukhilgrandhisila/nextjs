"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
};

type HomeProps = {
  trending: Movie[];
  topRated: Movie[];
  originals: Movie[];
  popular: Movie[];
};

export default function HomeComponent({
  trending,
  topRated,
  originals,
  popular,
}: HomeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const Router = useRouter();
  const handleMovieClick = (id: number) => {
    Router.push(`/movie-detailed-page/${id}`);
  };

  // 🔗 Merge all movies (avoid duplicates by id)
  const allMovies = useMemo(() => {
    const merged = [...trending, ...topRated, ...originals, ...popular];
    const unique = new Map<number, Movie>();
    merged.forEach((m) => unique.set(m.id, m));
    return Array.from(unique.values());
  }, [trending, topRated, originals, popular]);

  // 🔎 Filtered movies across all categories
  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* 🔍 Global Search Input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search all movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      {/* 🎬 Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick = {() => handleMovieClick(movie.id)}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform"
            >
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-2 text-center">
                <h2 className="text-white text-sm font-semibold">
                  {movie.title}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No movies found
          </p>
        )}
      </div>
    </div>
  );
}
