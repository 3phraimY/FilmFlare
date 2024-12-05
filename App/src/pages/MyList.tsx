import MovieTile from "./components/MovieTile";
<<<<<<< HEAD
import { useContext, useState, useMemo } from "react";
=======
import { useContext, useEffect } from "react";
>>>>>>> origin/main
import { useNavigate } from "react-router-dom";
import { UserContext, Movie } from "../contexts/UserDataContext";
import "./MyList.css";

function MyList() {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { user, refreshUserData } = context;
  const navigate = useNavigate();

<<<<<<< HEAD
  interface RecommendedMovie {
    IMDBid: string | number;
    movie: Movie;
    count: number;
    recommenders: string[];
    ratings: number[];
    averageRating: number;
  }

  // State to manage the rating for each movie the user wants to recommend
  const [movieRatings, setMovieRatings] = useState<Record<string, number>>({});

  // Recommendations logic
  const recommendations = useMemo(() => {
    const movieCounts: Record<string, RecommendedMovie> = {};

    user?.Friends.forEach((friend) => {
      friend.Recommendations?.forEach((movie) => {
        const existing = movieCounts[movie.IMDBid];
        if (existing) {
          existing.count += 1;
          existing.recommenders.push(friend.Username);
          if (movie.rating !== undefined) {
            existing.ratings.push(movie.rating);
          }
        } else {
          movieCounts[movie.IMDBid] = {
            IMDBid: movie.IMDBid,
            movie: movie,
            count: 1,
            recommenders: [friend.Username],
            ratings: movie.rating !== undefined ? [movie.rating] : [],
            averageRating: 0,
          };
        }
      });
    });

    // Compute the average rating for each movie
    Object.values(movieCounts).forEach((rec) => {
      const totalRatings = rec.ratings.reduce((sum, rating) => sum + rating, 0);
      rec.averageRating = rec.ratings.length > 0
        ? totalRatings / rec.ratings.length
        : 0;
    });

    return movieCounts;
  }, [user]);

  // Handle rating change for a movie
  const handleRatingChange = (IMDBid: string, rating: number) => {
    setMovieRatings((prevRatings) => ({
      ...prevRatings,
      [IMDBid]: rating,
    }));
  };

  // Handle recommending a movie
  const handleRecommendMovie = (movie: Movie) => {
    const rating = movieRatings[movie.IMDBid] || 0;

    // Add the recommendation to the user's context (mocking this part as it may involve an API call or backend update)
    console.log(`Recommending movie: ${movie.Title} with rating: ${rating}`);
    // You'd typically call an API or update the user context here
  };

=======
  useEffect(() => {
    refreshUserData();
  }, []);
>>>>>>> origin/main
  return (
    <>
      <div className="title-wrapper">
        <div className="add-movie-my-list">
          <button
            onClick={() => navigate("/search")}
            style={{ display: "flex" }}
          >
            <div className="add-movie-text" style={{ alignSelf: "center" }}>
              Add Movie
            </div>
            <img
              style={{ alignSelf: "center", marginLeft: "5px" }}
              height={25}
              width={25}
              src="https://img.icons8.com/?size=100&id=114100&format=png&color=000000"
              alt="Add Movie Icon"
            />
          </button>
        </div>
        <div className="recommended-title">Recommended for you</div>
      </div>

      <div className="movie-list-wrapper">
        <div className="my-list-movies">
          {user?.MyList.map((movie) => (
            <div key={movie.IMDBid} className="movie-item">
              <MovieTile movie={movie} />
              <div className="rate-movie">
                <span>Rate this movie:</span>
                {[...Array(5)].map((_, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={`rating-${movie.IMDBid}`}
                      value={index + 1}
                      checked={movieRatings[movie.IMDBid] === index + 1}
                      onChange={() => handleRatingChange(movie.IMDBid, index + 1)}
                    />{" "}
                    {index + 1}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="reccomended-movies">
          {Object.values(recommendations).map((recommendedMovie) => (
            <div key={recommendedMovie.IMDBid} className="movie-recommendation">
              <MovieTile movie={recommendedMovie.movie} />
              <div>
                Recommended by {recommendedMovie.count}{" "}
                {recommendedMovie.count > 1 ? "friends" : "friend"}:{" "}
                {recommendedMovie.recommenders.join(", ")}
              </div>
              {recommendedMovie.averageRating > 0 && (
                <div>
                  Average Rating:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {recommendedMovie.averageRating.toFixed(1)} / 5
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyList;
