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

const SearchTrigger = () => {
  // Function to handle movie search
  const searchMovies = () => {
    console.log("Search movies triggered!");
    // Add API call logic here

    // like it is important to call API logic here.
  };

  return (
    <div>
      {/* Search Bar */}
      <header className="search-bar">
        <input
          type="text"
          placeholder="Search Movies..."
          id="search-input"
          aria-label="Search Movies"
        />
        <button onClick={searchMovies}>Search</button>
      </header>

      {/* Movie Grid */}
      <main>
        <section className="movie-grid">
          {/* Example Movie Tiles */}
          {Array.from({ length: 10 }, (_, index) => (
            <div className="movie-tile" key={index}>
              <img src="placeholder.jpg" alt={`Movie Poster ${index + 1}`} />
              <div className="movie-details">
                <h3 className="movie-title">Movie Title {index + 1}</h3>
                <p className="movie-overview">Short description...</p>
                <span className="user-rating">Rating: 8/10</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};


