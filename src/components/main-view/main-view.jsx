import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

function searchMovieTitle(movieTitle, movies) {
  if (!movieTitle) {
    return;
  }
  const title = movieTitle;
  const filteredMovies = movies.filter((movie) => {
    return movie.Title.includes(title);
  });
  if (filteredMovies.length === 0) {
    alert("No movie by that title");
  }
  return filteredMovies;
}

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);

  //const [selectedMovie, setSelectedMovie] = useState(null);

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [token, setToken] = useState(storedToken ? storedToken : null);

  const onSearch = (movieTitle) => {
    const result = searchMovieTitle(movieTitle, movies);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixapp-495f4f3fbc03.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  function onLoggedOut() {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={onLoggedOut}
        onSearch={onSearch}
      />
      <Routes>
        <Route
          path="/signup"
          element={<>{user ? <Navigate to="/" /> : <SignupView />}</>}
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              )}
            </>
          }
        />
        <Route
          path="/movies/:movieID"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <div>The list is empty!</div>
              ) : (
                <Col md={10} style={{ border: "1px solid black" }}>
                  <MovieView movies={movies} />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <div>The list is empty!</div>
              ) : (
                <>
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie._id}
                      movie={movie}
                      token={token}
                      user={user}
                      setUser={setUser}
                    />
                  ))}
                </>
              )}
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  user={user}
                  movies={movies}
                  token={token}
                  setUser={setUser}
                  onLoggedOut={onLoggedOut}
                />
              )}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
