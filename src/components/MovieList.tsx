import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: { id: string; poster_path: string; title: string }[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
