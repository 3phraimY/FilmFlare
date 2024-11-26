// example code for how calling functions from UserApi will work
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserDataContext";
import { AddMovieToList, ListName } from "../hooks/UserApi";
import { GetMoviebyID } from "../hooks/MovieApi";
import { Movie } from "../contexts/UserDataContext";
import "./MovieDetails.css";


const MovieDetails: React.FC<{ movie: Movie, setActive: any }> = ({ movie, setActive}) => {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { user, refreshUserData } = context;

  const [ response, setResponse ] = useState<any>();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await GetMoviebyID(movie.IMDBid);

        if (!response) {
          //const responseText = await response.text();
          //console.error('Network response was not ok:', responseText); // Log the response text
          throw new Error('Network response was not ok');
        }

        const jsonResponse = response;
        setResponse(jsonResponse);
        console.log(jsonResponse);
        console.log("========================================");
        console.log(jsonResponse.Plot);
        console.log(jsonResponse.Director);
        console.log(jsonResponse.Title);
        console.log("========================================");
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, []);


 


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
    <div className="movie-details-wrapper">
      <div>
        <div>
          {response && response.Title}
        </div>
        <button onClick={() => setActive(false)}>close movie</button>
      </div>
      <div>
        <div><img src={response && response.Poster}></img></div>
        <div>
          <div>Movie Rating: {response && response.Rating}</div>
          <div>Release Date: {response && response.Released}</div>
          <div>Directed By: {response && response.Director}</div>
          <div>Runtime: {response && response.Runtime}</div>
          <div>Actors: {response && response.Actors}</div>
          <div>Genres: {response && response.Genre}</div>
        </div>
      </div>
      <div>Plot: {response && response.Plot}</div>
    </div>
    </>
  );
}
export default MovieDetails;