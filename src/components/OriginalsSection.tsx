"use client";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import MovieList from "./MovieList";

export default function OriginalsSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOriginals() {
      try {
        const res = await fetch("https://apis.ccbp.in/movies-app/originals");
        const data = await res.json();
        setMovies(data.movies || []);
      } catch (err) {
        console.error("Error fetching originals:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOriginals();
  }, []);

  return (
    <section>
      <h2 className="text-white text-xl font-bold px-4">Originals</h2>
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </section>
  );
}
