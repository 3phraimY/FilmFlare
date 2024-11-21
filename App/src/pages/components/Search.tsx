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
    async function loadMovies() {
      try {
        const response = await GetMoviebyMovieName(searchInput);
        console.log(response);
        //need to try to map response into individual movies using the imported Movie Interface

        const data = await response.json();
        const movieInterfaces = data.map((movie: Movie, index: number) => ({
          //here is the full Movie interface defined in UserDataContext which is now imported
          /*
          Movie {
          IMDBid: string;
          Title: string;
          UserRating: number;
          MoviePosterURL: string;
          }
          */
          //I haven't looked at what the response json looks like but will need to do something like this:
          //const newMovie = {response.movie[index].id, response.movie[index].title, response.movie[index].posterURL}
          // setMovies(movies.append(newMovie))
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
  }, [setSearchClick]);

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
          {/* Movie tiles will be using the Movie tile compent
            once you have the movies array you can do a map fucntion and pass individual movies into components
            this is the idea:
            map(movie) => {
            <MovieTile movie=movie/>
            }
          */}
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
