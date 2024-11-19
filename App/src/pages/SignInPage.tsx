import { useContext, FormEvent, useState } from "react";
import { UserContext } from "../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

//create onSubmit function take in enteredUsername
//example on signUppage
//set user = to entered Username
//check if password matches username
//if does navigate to my list page
//if not error message display screen
//look at conditional rendering
//look at header componant

function SignInPage() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user, fetchUserData } = context;

  // State variables to hold the entered username and password
  const [enteredUsername, setEnteredUsername] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // State variable to hold any error messages

  // Function to handle sign in when the button is clicked
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //set the entered username to be the new user
    fetchUserData(enteredUsername); //will throw an error through fetchUserData if needed
    // Check if entered username and password match the user data
    if (enteredPassword === user?.Password) {
      // Login successful
      navigate("/mylist"); //navigate to personal MyList homepage if login was successful
    } else {
      //Login Unsuccessful
      setError("Username or password is incorrect"); // Set an error message if credentials don't match
    }
  };

  return (
    <>
      <div className="sign-up-page">
        <h1>Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              value={enteredUsername} // Bind the input value to the enteredUsername state
              onChange={(e) => setEnteredUsername(e.target.value)} // Update state on input change
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={enteredPassword} // Bind the input value to the enteredPassword state
              onChange={(e) => setEnteredPassword(e.target.value)} // Update state on input change
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default SignInPage;
