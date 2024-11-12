import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserDataContext";

function SignInPage() {
  const context = useContext(UserContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user, fetchUserData, refreshUserData } = context;

  useEffect(() => {
    fetchUserData("testUser");
  }, []);

  return (
    <>
      {user && (
        <div>
          <h1>{user.Username}</h1>
          <p>Password: {user.Password}</p>
          <p>My List: {user.MyList.map((movie) => movie.Title).join(", ")}</p>
          <p>
            My Favorites:{" "}
            {user.MyFavorites.map((movie) => movie.Title).join(", ")}
          </p>
          <p>To Watch: {user.ToWatch.map((movie) => movie.Title).join(", ")}</p>
          <p>
            Friends: {user.Friends.map((friend) => friend.Username).join(", ")}
          </p>
          <button onClick={refreshUserData}>Refresh Data</button>
        </div>
      )}
    </>
  );
}

export default SignInPage;
