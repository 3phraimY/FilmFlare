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
          response.Search.map((movie: any) => {
            //create a new movie, define object and manually set the properties 
            console.log(movie);
            const newMovie: Movie {
              IMDBid: movie.imdbID as string,
              MoviePosterURL: movie.Poster as string,
              Title: movie.Title as string,
              UserRating: 0,
            };
            // add the new movie to the movies array
            setMovies()
          });
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
      <input
        type="text"
        className="search-input"
        placeholder="Search for a movie..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      
      {/* Button to trigger the search */}
      <button
        className="search-button"
        onClick={() => setSearchClick(!searchClick)}
      >
        Search
      </button>
  
      {/* Display movies */}
      
    </div>
  );
  
}
export default Search;

/*
        parsing the JSON to get the responses. 
          //here is the full Movie interface defined in UserDataContext which is now imported
          /*
          Movie {
            MoviePosterURL: string;
            Title: string;
            UserRating: number;
            IMDBid: string;
          }
          */
          //I haven't looked at what the response json looks like but will need to do something like this:
          //const newMovie = {response.movie[index].id, response.movie[index].title, response.movie[index].posterURL}
          // setMovies(movies.append(newMovie))