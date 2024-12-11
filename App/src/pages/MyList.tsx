import MovieTile from "./components/MovieTile";
import { useContext, useEffect, useMemo } from "react";
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

  useEffect(() => {
    refreshUserData();
  }, [user]);

  interface RecommendedMovie {
    IMDBid: string | number;
    movie: Movie;
    count: number;
    recommenders: string[];
  }

  // Recommendations logic
  const recommendations = useMemo(() => {
    const movieCounts: Record<string, RecommendedMovie> = {};

    user?.Friends.forEach((friend) => {
      friend.Recommendations?.forEach((movie) => {
        const existing = movieCounts[movie.IMDBid];
        if (existing) {
          existing.count += 1;
          existing.recommenders.push(friend.Username);
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

    return movieCounts;
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
              alt="Add Movie Icon"
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
                <strong>Recommended by:</strong> {recommendedMovie.count}{" "}
                {recommendedMovie.count > 1 ? "friends" : "friend"}
              </div>
              <div>
                <strong>Names:</strong>{" "}
                {recommendedMovie.recommenders.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyList;
