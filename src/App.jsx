import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import MoviesPage from "./pages/moviesPage/MoviesPage";
import MoviePage from "./pages/moviePage/MoviePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppHeader from "./components/header/Header";
import UserPage from "./pages/userPage/UserPage";
import LoginPage from "./pages/loginPage/LoginPage";
import { useAuth } from "./pages/loginPage/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route
            path="/about_me"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
