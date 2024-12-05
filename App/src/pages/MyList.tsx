import MovieTile from "./components/MovieTile";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserDataContext";
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
  }, []);
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
          {user?.Friends.map((friend) =>
            friend.Recommendations?.map((recommendedMovie) => (
              <div key={recommendedMovie.IMDBid}>
                <MovieTile
                  key={recommendedMovie.IMDBid}
                  movie={recommendedMovie}
                />
                <div>by: {friend.Username}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default MyList;
