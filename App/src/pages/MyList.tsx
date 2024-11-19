import MovieTile from "./components/MovieTile";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserDataContext";
import "./MyList.css";

function MyList() {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { user, fetchUserData } = context;

  useEffect(() => {
    fetchUserData("testUser");
  }, []);
  return (
    <>
      <div className="title-wrapper">
        <div className="add-movie">Add Movie</div>
        <div className="recommended-title">Recommended for you</div>
      </div>
      <div className="movie-list-wrapper">
        <div className="my-list-movies">
          {user?.MyList.map((movie) => (
            <MovieTile key={movie.IMDBid} movie={movie} />
          ))}
        </div>
        <div className="reccomended-movies">
          {user?.MyList.map((movie) => (
            <MovieTile key={movie.IMDBid} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
export default MyList;
