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
import { debounce } from "lodash";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  //const [selectedMovie, setSelectedMovie] = useState(null);

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [token, setToken] = useState(storedToken ? storedToken : null);

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
        setFilteredMovies(movies);
      });
  }, [token]);

  function onLoggedOut() {
    setUser(null);
    setToken(null);
    localStorage.clear();
    window.location.reload();
  }

  // Code to handle a search input
  const handleSearch = (search) => {
    setSearchKey(search.target.value);
    movieSearch(search.target.value);
  };

  const movieSearch = debounce((searchKey) => {
    const tempMovieFilter = movies.filter((movie) => {
      return movie.Title.toLowerCase().includes(searchKey.toLowerCase());
    });
    setFilteredMovies(tempMovieFilter);
  }, 400);

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Routes>
        <Route
          path="/signup"
          element={
            <div className="background-color">
              {user ? <Navigate to="/" /> : <SignupView />}
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="background-color">
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
            </div>
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
              ) : filteredMovies.length === 0 ? (
                <div>The list is empty!</div>
              ) : (
                <>
                  <Col className="search-entry" md={12}>
                    <input
                      type="text"
                      value={searchKey}
                      onChange={handleSearch}
                      placeholder="Search movies..."
                    />
                  </Col>
                  {filteredMovies.map((movie) => (
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
