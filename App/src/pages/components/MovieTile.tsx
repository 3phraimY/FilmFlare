import React from "react";
import { Movie } from "../../contexts/UserDataContext";
import "./MovieTile.css";

const MovieTile: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <>
      <div className="movie-tile-wrapper">
        <div className="movie-title">{movie.Title}</div>
        <img src={movie.MoviePosterURL} className="movie-poster" />
        {movie.UserRating != 0 && (
          <div className="star-rating">User Rating: {movie.UserRating}</div>
        )}
      </div>
    </>
  );
};

export default MovieTile;
