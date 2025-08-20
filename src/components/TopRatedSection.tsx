"use client";

import { useState } from "react";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
};

export default function TopRatedMovies({ movies = [] }: { movies?: Movie[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // If movies is undefined/null, fallback to []
  const filteredMovies = (movies || []).filter((movie) =>
    movie?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Search Input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
        />
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-900 rounded-2xl shadow-md overflow-hidden hover:scale-105 transition">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-2 text-center">
                <h2 className="text-white text-sm font-semibold">{movie.title}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No movies found</p>
        )}
      </div>
    </div>
  );
}

