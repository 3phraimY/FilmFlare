import React from "react";
import "./MovieTile.css";
import "./Search.css";
import { useState } from "react";
import { Movie, UserContext } from "../../contexts/UserDataContext";
import  MovieDetails  from "../MovieDetails";

const MovieTile: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [isMovieDetailsActive, setisMovieDetailsActive] = useState<boolean>(false);
  return (
    <>
    {isMovieDetailsActive && <MovieDetails movie={movie} setActive = {setisMovieDetailsActive}/>}
    <button onClick={() => setisMovieDetailsActive(true) }>

      <div className="movie-tile-wrapper">
        <div className="movie-title">{movie.Title}</div>
        <img src={movie.MoviePosterURL} className="movie-poster" />
        {movie.UserRating != 0 && (
          <div className="star-rating">User Rating: {movie.UserRating}</div>
        )}
      </div>
    </button>
      
    </>
  );
};

interface MovieProps {
  movie: {
    IMDBid: string;
    MoviePosterURL: string;
    Title: string;
  };
}

function Movietile({ movie }: MovieProps) {
  return (
    <div className="movie-tile">
      <img src={movie.MoviePosterURL} alt={movie.Title} />
      <div className="movie-details">
        <h3 className="movie-title">{movie.Title}</h3>
      </div>
    </div>
  );
}
