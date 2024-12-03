import MovieTile from "./components/MovieTile";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, Movie } from "../contexts/UserDataContext";
import "./MyList.css";

function MyList() {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { user } = context;
  const navigate = useNavigate();

  interface RecommendedMovie {
    IMDBid: any;
    movie: Movie;
    count: number;
    recommenders: string[];
    // Add other properties from the movie object
  }
  const [recommendations, setRecommendations] = useState<
    Record<string, RecommendedMovie>
  >({});

  useEffect(() => {
    const movieCounts: Record<string, RecommendedMovie> = {};

    user?.Friends.forEach((friend) => {
      friend.Recommendations?.forEach((movie) => {
        if (movieCounts[movie.IMDBid]) {
          movieCounts[movie.IMDBid].count += 1;
          movieCounts[movie.IMDBid].recommenders.push(friend.Username);
        } else {
          movieCounts[movie.IMDBid] = {
            IMDBid: movie.IMDBid,
            movie: movie,
            count: 1,
            recommenders: [friend.Username],
          };
        }
      });
    });

    setRecommendations(movieCounts);
  }, [user]);

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
            />
          </button>
        </div>
        <div className="recommended-title">Recommended for you</div>
      </div>

      <div className="movie-list-wrapper">
        <div className="my-list-movies">
          {user?.MyList.map((movie) => (
            <MovieTile key={movie.IMDBid} movie={movie} />
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
              <div className="star-rating">
                <label>
                  <input
                    type="radio"
                    name={`rating-${recommendedMovie.IMDBid}`}
                    value="1"
                  />{" "}
                  1
                </label>
                <label>
                  <input
                    type="radio"
                    name={`rating-${recommendedMovie.IMDBid}`}
                    value="2"
                  />{" "}
                  2
                </label>
                <label>
                  <input
                    type="radio"
                    name={`rating-${recommendedMovie.IMDBid}`}
                    value="3"
                  />{" "}
                  3
                </label>
                <label>
                  <input
                    type="radio"
                    name={`rating-${recommendedMovie.IMDBid}`}
                    value="4"
                  />{" "}
                  4
                </label>
                <label>
                  <input
                    type="radio"
                    name={`rating-${recommendedMovie.IMDBid}`}
                    value="5"
                  />{" "}
                  5
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyList;
