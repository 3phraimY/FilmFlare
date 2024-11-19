import { useContext, FormEvent, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

function SignInPage() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user, fetchUserData, setUser } = context;

  // State variables to hold the entered username and password
  const [enteredUsername, setEnteredUsername] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // State variable to hold any error messages
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
  const [isFetched, setIsFetched] = useState(false); // State variable to track if user data is fetched

  // Function to handle sign in when the button is clicked
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setIsFetched(false);
    try {
      // Fetch user data
      await fetchUserData(enteredUsername);
      setIsFetched(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred while fetching user data");
    }
  };

  // Effect to check password after user data is fetched
  useEffect(() => {
    if (isFetched) {
      if (enteredPassword === user?.Password) {
        // Login successful
        navigate("/mylist"); // Navigate to personal MyList homepage if login was successful
      } else {
        // Login unsuccessful
        setError("Username or password is incorrect"); // Set an error message if credentials don't match
      }
    }
  }, [isFetched]);

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
              value={enteredUsername}
              onChange={(e) => setEnteredUsername(e.target.value)} // Update state on input change
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)} // Update state on input change
              required
            />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default SignInPage;