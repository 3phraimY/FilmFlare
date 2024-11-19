import React, { useState, FormEvent, useContext } from "react";
import { UserContext } from "../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../hooks/UserApi";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const context = useContext(UserContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user, fetchUserData } = context;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await CreateUser(username, password);
      if (response) {
        fetchUserData(username);
        console.log("User created successfully", user);

        // Navigate to MyList.tsx
        navigate("/mylist");
      } else {
        setError("Username already exists. Please choose another.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="sign-up-page">
      <h1>Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;

// on sucsess of signing up  set the user to the user just created.
// FecthUser data function should be called within UserApi.tsx
// navigate the user to MyList.tsx
// on failure  of signing up due to user already been made give an error.
// css styling for page.
