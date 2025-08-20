"use client"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import Loading from "@/app/loading" // Assuming you have a loading component

// Simplified the component's props for better clarity
const MovieDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  // It's safer to check if 'id' is an array before accessing the first element
  const movieId = Array.isArray(id) ? id[0] : id

  const [movieDetails, setMovieDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleMovieClick = (movieIdToNav: number) => {
    // When navigating, reset the loading state to show the spinner for the new page
    setLoading(true)
    router.push(`/movie-detailed-page/${movieIdToNav}`)
  }

  useEffect(() => {
    // Reset state when movieId changes. This is crucial for navigating between similar movies.
    setMovieDetails(null)
    setLoading(true)
    setError(null)

    if (!movieId) return

    const fetchMovieDetails = async () => {
      try {
        const token = Cookies.get("jwt_token")
        if (!token) {
          router.push('/login'); // Redirect to login if no token
          return;
        }
        const response = await fetch(
          `https://apis.ccbp.in/movies-app/movies/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error_msg || "Failed to fetch movie details");
        }
        const data = await response.json()
        setMovieDetails(data.movie_details)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [movieId, router]) // Added router to the dependency array

  // This block now correctly handles the loading and initial null state
  if (loading || !movieDetails) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white text-center p-4">
        <p className="text-xl text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    // THE FIX: Added pt-20 back to push content down from under the navbar.
    <div className="movie-details bg-black text-white pt-20">
      {/* Backdrop Image */}
      <div
        className="backdrop bg-cover bg-center h-[70vh] text-white p-8 md:p-12 flex flex-col justify-end"
        style={{
          backgroundImage: movieDetails.backdrop_path
            ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%), url(${movieDetails.backdrop_path})`
            : `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)`,
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">{movieDetails.title}</h1>
        <div className="flex items-center space-x-4 mt-4 text-lg">
          <span>
            {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m
          </span>
          <span className="border px-2 rounded">{movieDetails.adult ? "A" : "U/A"}</span>
          <span>{new Date(movieDetails.release_date).getFullYear()}</span>
        </div>
        <p className="mt-4 max-w-2xl text-gray-200">{movieDetails.overview}</p>
        <button className="mt-6 px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors w-fit">
          Play
        </button>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 bg-[#181818]">
        <div>
          <h3 className="text-gray-400 font-semibold">Genres</h3>
          {movieDetails.genres.map((g: any) => (
            <p key={g.id} className="text-lg">{g.name}</p>
          ))}
        </div>
        <div>
          <h3 className="text-gray-400 font-semibold">Audio Available</h3>
          {movieDetails.spoken_languages.map((lang: any) => (
            <p key={lang.id} className="text-lg">{lang.english_name}</p>
          ))}
        </div>
        <div>
          <h3 className="text-gray-400 font-semibold">Rating Count</h3>
          <p className="text-lg">{movieDetails.vote_count.toLocaleString()}</p>
          <h3 className="text-gray-400 font-semibold mt-4">Rating Average</h3>
          <p className="text-lg">{movieDetails.vote_average.toFixed(1)}</p>
        </div>
        <div>
          <h3 className="text-gray-400 font-semibold">Budget</h3>
          <p className="text-lg">{parseInt(movieDetails.budget).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          <h3 className="text-gray-400 font-semibold mt-4">Release Date</h3>
          <p className="text-lg">
            {new Date(movieDetails.release_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Similar Movies */}
      <div className="p-8 md:p-12 bg-black">
        <h2 className="text-2xl font-bold mb-4">More like this</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {movieDetails.similar_movies.map((movie: any) => (
            <div 
              key={movie.id}  
              onClick={() => handleMovieClick(movie.id)} 
              className="flex-shrink-0 w-40 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <img src={movie.poster_path} alt={movie.title} className="w-full rounded-lg object-cover" />
              <p className="mt-2 text-sm text-center">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage
