import SignInPage from "./pages/SignInPage";
import Header from "./pages/components/Header";
import SignUpPage from "./pages/SignUpPage";
import MyList from "./pages/MyList";
import ToWatch from "./pages/ToWatch";
import "./App.css";
import { UserProvider } from "./contexts/UserDataContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Friends from "./pages/Friends";

function App() {
  return (
    <UserProvider>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Header />
        <Routes>
          <Route path="/mylist" element={<MyList />} />
          <Route path="/towatch" element={<ToWatch />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
