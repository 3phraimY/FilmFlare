// example code for how calling functions from UserApi will work
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserDataContext";
import {
  AddMovieToFriendRecommendations,
  AddMovieToList,
  ListName,
} from "../hooks/UserApi";
import { GetMoviebyID } from "../hooks/MovieApi";
import { Movie } from "../contexts/UserDataContext";
import "./MovieDetails.css";

const MovieDetails: React.FC<{ movie: Movie; setActive: any }> = ({
  movie,
  setActive,
}) => {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { user, refreshUserData } = context;

  const [response, setResponse] = useState<any>();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await GetMoviebyID(movie.IMDBid);

        if (!response) {
          //console.error('Network response was not ok:', responseText); // Log the response text
          throw new Error("Network response was not ok");
        }
        const jsonResponse = response;
        setResponse(jsonResponse);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, []);

  function handleAddMovie(listName: ListName) {
    AddMovieToList(
      user!.Username,
      listName,
      movie.IMDBid,
      movie.Title,
      movie.MoviePosterURL,
      0
    );
    setIsAddMovieActive(false);
  }
  function handleRecommendMovie(friendUsername: string) {
    AddMovieToFriendRecommendations(
      user!.Username,
      friendUsername,
      movie.IMDBid,
      movie.Title,
      movie.MoviePosterURL,
      0
    );
    setIsRecommendMovieActive(false);
  }

  const [isAddMovieActive, setIsAddMovieActive] = useState<boolean>(false);
  const [isRecommendMovieActive, setIsRecommendMovieActive] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>(
    "translate(109px, -217px)"
  );

  useEffect(() => {
    if (dropdownRef.current) {
      const dropdownHeight = dropdownRef.current.offsetHeight;
      setTransform(`translate(109px, ${-dropdownHeight + 50}px)`);
    }
  }, [isRecommendMovieActive]);

  return (
    <>
      {response && (
        <div className="movie-details-wrapper">
          <div className="movie-details-background">
            <div className="movie-details-title-wrapper">
              <div className="movie-details-placeholder" />
              <div className="movie-details-title-text">
                {response && response.Title}
              </div>
              <button
                className="movie-details-close"
                onClick={() => setActive(false)}
              >
                <img
                  height={30}
                  width={30}
                  src="https://icon-library.com/images/close-x-icon/close-x-icon-17.jpg"
                />
              </button>
            </div>
            <div className="movie-details-content">
              <div>
                <img src={response && response.Poster}></img>
              </div>
              <div className="movie-details-content-text">
                {response.Rated && (
                  <div>
                    Movie Rating:{" "}
                    <span className="white-text">{response.Rated}</span>
                  </div>
                )}
                {response.Released && (
                  <div>
                    Release Date:{" "}
                    <span className="white-text"> {response.Released}</span>
                  </div>
                )}
                {response.Director && (
                  <div>
                    Directed By:{" "}
                    <span className="white-text">{response.Director}</span>
                  </div>
                )}
                {response.Runtime && (
                  <div>
                    Runtime:{" "}
                    <span className="white-text">{response.Runtime}</span>
                  </div>
                )}
                {response.Actors && (
                  <div>
                    Actors:{" "}
                    <span className="white-text">{response.Actors}</span>
                  </div>
                )}
                {response.Genre && (
                  <div>
                    Genre: <span className="white-text">{response.Genre}</span>
                  </div>
                )}
              </div>
            </div>
            {response.Plot && (
              <div className="movie-details-plot">
                Plot: <span className="white-text">{response.Plot}</span>
              </div>
            )}
            <div className="add-movie-dropdown-wrapper">
              <div className="add-movie-title-wrapper"></div>
              {isAddMovieActive && (
                <div className="add-movie-dropdown-wrapper">
                  <div className="add-movie-dropdown">
                    <div className="dropdown-title">
                      <div className="add-movie-to">Add to: </div>
                      <button
                        className="add-movie-close"
                        onClick={() => setIsAddMovieActive(false)}
                      >
                        <img
                          height={30}
                          width={30}
                          src="https://icon-library.com/images/close-x-icon/close-x-icon-17.jpg"
                        />
                      </button>
                    </div>
                    <button
                      className="add-movie-dropdown-buttons"
                      onClick={() => handleAddMovie(ListName.MyList)}
                    >
                      {ListName.MyList}
                    </button>
                    <button
                      className="add-movie-dropdown-buttons"
                      onClick={() => handleAddMovie(ListName.ToWatch)}
                    >
                      {ListName.ToWatch}
                    </button>
                    <button
                      className="add-movie-dropdown-buttons"
                      onClick={() => handleAddMovie(ListName.MyFavorites)}
                    >
                      {ListName.MyFavorites}
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={() => setIsAddMovieActive(true)}
                className="movie-details-add-movie-button"
              >
                <div className="movie-details-add-movie-text">Add Movie</div>
                <img
                  style={{ alignSelf: "center", marginLeft: "5px" }}
                  height={25}
                  width={25}
                  src="https://img.icons8.com/?size=100&id=114100&format=png&color=000000"
                />
              </button>
              {isRecommendMovieActive && (
                <div
                  ref={dropdownRef}
                  style={{ transform }}
                  className="recommend-movie-dropdown"
                >
                  <div className="dropdown-title">
                    <div className="add-movie-to">Recommend To: </div>
                    <button
                      className="recommend-movie-close"
                      onClick={() => setIsRecommendMovieActive(false)}
                    >
                      <img
                        height={30}
                        width={30}
                        src="https://icon-library.com/images/close-x-icon/close-x-icon-17.jpg"
                      />
                    </button>
                  </div>
                  {user?.Friends.map((friend) => (
                    <button
                      key={friend.Username}
                      className="recommend-movie-dropdown-buttons"
                      onClick={() => handleRecommendMovie(friend.Username)}
                    >
                      {friend.Username}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => setIsRecommendMovieActive(true)}
                className="movie-details-recommend-movie-button"
              >
                <div className="movie-details-recommend-movie-text">
                  Recommend Movie
                </div>
                <img
                  style={{ alignSelf: "center", marginLeft: "5px" }}
                  height={25}
                  width={25}
                  src="https://img.icons8.com/?size=100&id=114100&format=png&color=000000"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MovieDetails;
