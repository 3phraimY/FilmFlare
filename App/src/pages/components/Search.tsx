import { useState, useEffect } from "react";
import MovieTile from "./MovieTile";
import { Movie } from "../../contexts/UserDataContext";
import { GetMoviebyMovieName } from "../../hooks/MovieApi";
import "./Search.css";

export function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchClick, setSearchClick] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchInput) {
        try {
          const response = await GetMoviebyMovieName(searchInput);

          const newMovies: Movie[] = response.Search.map((movie: any) => ({
            IMDBid: movie.imdbID || "",
            MoviePosterURL: movie.Poster || "",
            Title: movie.Title || "",
            UserRating: 0,
          }));
          // Clear the movies array and add new movies
          setMovies(newMovies);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    };
    fetchMovies();
  }, [searchClick]);

  return (
    <div className="search-container">
      {/* Input field to modify the search input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={() => setSearchClick(!searchClick)}>Search</button>
      </div>

      {/* Display movies */}
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieTile movie={movie} key={movie.IMDBid} />
          ))
        ) : (
          <p className="no-movies-message">No movies found. Try searching for something else.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
