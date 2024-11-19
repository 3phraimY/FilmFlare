// example code for how calling functions from UserApi will work
import { useContext } from "react";
import { UserContext } from "../contexts/UserDataContext";
import { AddMovieToList, ListName } from "../hooks/UserApi";

function MovieDetails() {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { user, refreshUserData } = context;

  //temp
  const handleclick = () => {
    AddMovieToList(
      user!.Username,
      ListName.MyList,
      "tt0097576",
      "Indiana Jones and the Last Crusade",
      "https://m.media-amazon.com/images/M/MV5BNGIxNzQ0YzYtMjNmYi00YjBlLWFjNzEtNGE3ZGFmYTczM2MwXkEyXkFqcGc@._V1_SX300.jpg"
    );
    refreshUserData();
  };

  return (
    <>
      <button onClick={() => handleclick()}>add movie</button>
    </>
  );
}
export default MovieDetails;
