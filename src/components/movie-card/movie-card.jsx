import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, setUser, token }) => {
  function addToFavorites() {
    fetch(
      `https://myflixapp-495f4f3fbc03.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("User updated");
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(error);
      });
  }
  function removeFromFavorites() {
    fetch(
      `https://myflixapp-495f4f3fbc03.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("User updated");
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(error);
      });
  }

  return (
    <Card className="main-card">
      <Card.Body className="card">
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <div>
          <Button variant="link" onClick={addToFavorites}>
            Add to Favorites
          </Button>
          <Button variant="link" onClick={removeFromFavorites}>
            Remove from Favorites
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  //onMovieClick: PropTypes.func.isRequired,
};
