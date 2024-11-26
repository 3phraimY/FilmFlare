import { useContext } from "react";
import { UserContext } from "../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import MovieTile from "./components/MovieTile";
import "./ToWatch.css";

function ToWatch() {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { user } = context;
  const navigate = useNavigate();
  return (
    <>
      <div className="add-movie">
        <button onClick={() => navigate("/search")} style={{ display: "flex" }}>
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
      <div className="movie-list">
        {user?.ToWatch.map((movie) => (
          <MovieTile movie={movie} />
        ))}
      </div>
    </>
  );
}

export default ToWatch;
