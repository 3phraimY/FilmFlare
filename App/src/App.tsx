import SignInPage from "./pages/SignInPage";
import Header from "./pages/components/Header";
import "./App.css";
import { UserProvider } from "./contexts/UserDataContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/SignUpPage" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
