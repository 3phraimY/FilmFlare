import React, { useEffect } from "react";
import "./MovieTile.css";
import "./Search.css";
import { useState } from "react";
import { Movie } from "../../contexts/UserDataContext";
import MovieDetails from "../MovieDetails";

const MovieTile: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [isMovieDetailsActive, setisMovieDetailsActive] =
    useState<boolean>(false);
  return (
    <>
      {isMovieDetailsActive && (
        <MovieDetails movie={movie} setActive={setisMovieDetailsActive} />
      )}
      <button
        className="movie-tile-button"
        onClick={() => setisMovieDetailsActive(true)}
      >
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

export default MovieTile;
