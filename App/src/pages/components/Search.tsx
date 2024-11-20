import React, { useState, useEffect } from "react";
import MovieTile from "./MovieTile";
import "./Search.css";
interface Movie {
  id: string;
  title: string;
  poster: string;
  overview: string;
  IMDBid: string;
  UserRating: number;
  MoviePosterURL: string;
}

export function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        const movieInterfaces = data.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          overview: movie.overview,
          IMDBid: movie.IMDBid,
          UserRating: movie.UserRating,
          MoviePosterURL: `https://image.tmdb.org/t/p/w500${movie.poster}`,
          Title: movie.title,
        }));
        setMovies(movieInterfaces);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    loadMovies();
  }, []);

  return (
    <div className="search-container">
      <h1>Search Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieTile key={movie.id} movie={{ ...movie, Title: movie.title }} />
        ))}
      </div>
    </div>
  );
}

export default Search;

