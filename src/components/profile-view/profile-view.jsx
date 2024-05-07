import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, token, setUser }) => {
  //const storedUser = JSON.parse(localStorage.getItem("user"));
  //const storedToken = localStorage.getItem("token");
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  console.log("user", user);
  //const [token, setToken] = useState(storedToken ? storedToken : null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
    };

    fetch(
      `https://myflixapp-495f4f3fbc03.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("User updated");
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(error);
      });
  };

  function deleteAccount() {
    fetch(
      `https://myflixapp-495f4f3fbc03.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(error);
      });
  }

  //const [token, setToken] = useState(storedToken ? storedToken : null);

  let favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  return (
    <>
      <span>Username: </span>
      <span>{user.Username}</span>
      <div>
        <span>Email: </span>
        <span>{user.Email}</span>
      </div>
      <br />

      <div>
        <form onSubmit={handleSubmit}>
          <h3>Update My Information</h3>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button type="submit">Update</button>
          <br />
          <div>or</div>
          <Link to={`/users/:Username`}>
            <button onClick={deleteAccount}>Delete my Account</button>
          </Link>
        </form>
      </div>
      <br />

      <h3>Favorites:</h3>
      {favoriteMovies.map((movie) => {
        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            token={token}
            user={user}
            setUser={setUser}
          />
        );
      })}
    </>
  );
};
