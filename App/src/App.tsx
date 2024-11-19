import SignInPage from "./pages/SignInPage";
import Header from "./pages/components/Header";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";
import "./App.css";
import { UserProvider } from "./contexts/UserDataContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Header />
        <Routes>
          <Route path="/mylist" element={<ErrorPage />} />
          <Route path="/towatch" element={<ErrorPage />} />
          <Route path="/favorites" element={<ErrorPage />} />
          <Route path="/findmovies" element={<ErrorPage />} />
          <Route path="/friends" element={<ErrorPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
