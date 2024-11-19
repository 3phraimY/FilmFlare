import MovieTile from "./components/MovieTile";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserDataContext";

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
      {user?.MyList.map((movie) => (
        <MovieTile key={movie.IMDBid} movie={movie} />
      ))}
    </>
  );
}
export default MyList;
