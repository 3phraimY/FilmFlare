import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import Header from "./pages/components/Header";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";
import { UserProvider } from "./contexts/UserDataContext";

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
          <Route path="/search" element={<ErrorPage />} />
          <Route path="/friends" element={<ErrorPage />} />
          <Route path="/signup" element={<ErrorPage />} />
          <Route path="*" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
