import SignInPage from "./pages/SignInPage";
import "./App.css";
import { UserProvider } from "./contexts/UserDataContext";

function App() {
  return (
    <>
      <UserProvider>
        <SignInPage />
      </UserProvider>
    </>
  );
}

export default App;
