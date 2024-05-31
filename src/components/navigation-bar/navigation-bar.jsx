import { useState } from "react";
import { useParams } from "react-router";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, onSearch, movies }) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  //const { movieID } = useParams();
  //const movie = movies.find((m) => m._id === movieID);

  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setMovieTitle(e.target.value);
  };

  const searchMovie = (movieTitle) => {
    onSearch(movieTitle);
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <form>
              <input
                type="search"
                placeholder="Search by Title"
                value={movieTitle}
                onChange={handleSearchChange}
              />
              <button onClick={searchMovie}>Search</button>
            </form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
