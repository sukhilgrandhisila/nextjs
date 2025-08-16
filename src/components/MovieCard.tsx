interface MovieCardProps {
  movie: { id: string; poster_path: string; title: string };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="w-40">
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="rounded-lg w-full h-56 object-cover"
      />
      <p className="text-white mt-2 text-sm text-center">{movie.title}</p>
    </div>
  );
}
