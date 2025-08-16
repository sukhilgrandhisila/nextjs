"use client";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import MovieList from "./MovieList";

export default function PopularSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopular() {
      try {
        const res = await fetch("https://apis.ccbp.in/movies-app/popular-movies");
        const data = await res.json();
        setMovies(data.movies || []);
      } catch (err) {
        console.error("Error fetching popular:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  return (
    <section>
      <h2 className="text-white text-xl font-bold px-4">Popular</h2>
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </section>
  );
}
