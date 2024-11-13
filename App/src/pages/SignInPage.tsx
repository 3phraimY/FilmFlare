import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserDataContext";

function SignInPage() {
  const context = useContext(UserContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user, fetchUserData } = context;

  useEffect(() => {
    fetchUserData("testUser");
  }, []);
  // State variables to hold the entered username and password
  const [enteredUsername, setEnteredUsername] = useState<string>(''); 
  const [enteredPassword, setEnteredPassword] = useState<string>(''); 
  const [error, setError] = useState('');// State variable to hold any error messages
  const [success, setSuccess] = useState('');

  // Function to handle login when the button is clicked
  const handleLogin = () => {
    // Check if entered username and password match the user data
    if (enteredUsername === user?.Username && enteredPassword === user?.Password) {
      setError(''); // Clear any previous error messages
      setSuccess('Username and Password Accepted');
      // Login successful, you can proceed with your logic here
    } else {
      setSuccess('');
      setError('Username or password is incorrect'); // Set an error message if credentials don't match
    }
  };

  return (
    <>
      {user && (
        <div>
          //if username entered in text field matches existing username, allow. Otherwise, error
          <h1>{user.Username}</h1>
          //if password entered in text field matches password for username, allow. Otherwise, error
          <p>Password: {user.Password}</p>

          <div>
            <label>
              Username:
              <input
                type="username"
                value={enteredUsername} // Bind the input value to the enteredUsername state
                onChange={(e) => setEnteredUsername(e.target.value)} // Update state on input change
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={enteredPassword} // Bind the input value to the enteredPassword state
                onChange={(e) => setEnteredPassword(e.target.value)} // Update state on input change
              />
            </label>
            <br />
            <button onClick={handleLogin}>Login</button> {/* Button to trigger the login function */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message if any */}
          </div>

          {/* <p>My List: {user.MyList.map((movie) => movie.Title).join(", ")}</p>
          <p>
            My Favorites:{" "}
            {user.MyFavorites.map((movie) => movie.Title).join(", ")}
          </p>
          <p>To Watch: {user.ToWatch.map((movie) => movie.Title).join(", ")}</p>
          <p>
            Friends: {user.Friends.map((friend) => friend.Username).join(", ")}
          </p>
          <button onClick={refreshUserData}>Refresh Data</button> */}

        </div>
      )}
    </>
  );
}

export default SignInPage;