import SignInPage from "./pages/SignInPage";
import Header from "./pages/components/Header";
import "./App.css";
import { UserProvider } from "./contexts/UserDataContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<SignInPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
