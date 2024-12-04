import React from "react";
import "./MovieTile.css";
import "./Search.css";
import { useState } from "react";
import { Movie } from "../../contexts/UserDataContext";
import MovieDetails from "../MovieDetails";
import filledStar from "../../assets/fillStar.png";
import emptyStar from "../../assets/emptyStar.png";

const MovieTile: React.FC<{ movie: Movie }> = ({ movie }) => {
  const [isMovieDetailsActive, setisMovieDetailsActive] =
    useState<boolean>(false);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < movie.UserRating) {
        stars.push(
          <img
            key={i}
            height={20}
            width={20}
            src={filledStar}
            alt="filled star"
          />
        );
      } else {
        stars.push(
          <img
            key={i}
            height={20}
            width={20}
            src={emptyStar}
            alt="empty star"
          />
        );
      }
    }
    return stars;
  };

  return (
    <>
      {isMovieDetailsActive && (
        <MovieDetails
          key={movie.IMDBid}
          movie={movie}
          setActive={setisMovieDetailsActive}
        />
      )}
      <button
        className="movie-tile-button"
        onClick={() => setisMovieDetailsActive(true)}
      >
        <div className="movie-tile-wrapper">
          <div className="movie-title">{movie.Title}</div>
          <img src={movie.MoviePosterURL} className="movie-poster" />
          {movie.UserRating != 0 ? (
            <div className="star-rating">{renderStars()}</div>
          ) : (
            <div style={{ height: 30, opacity: 0 }}>
              <div style={{ height: 6, opacity: 0 }}>whitespace</div>
              <div>whitespace</div>
            </div>
          )}
        </div>
      </button>
    </>
  );
};

export default MovieTile;
