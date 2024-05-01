import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, movies, token }) => {
  //const storedUser = JSON.parse(localStorage.getItem("user"));
  //const storedToken = localStorage.getItem("token");
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
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

  //const [token, setToken] = useState(storedToken ? storedToken : null);

  let favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  //useEffect(() => {
  //if (!token) {
  //return;
  //}

  //fetch("https://myflixapp-495f4f3fbc03.herokuapp.com/users", {
  //headers: { Authorization: `Bearer ${token}` },
  //})
  //.then((response) => response.json())
  //.then((user) => {
  //setUser(user);
  //});
  //}, [token]);

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
            defaultValue={user.Username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChage={(e) => setPassword(e.target.value)}
          />
          <br />
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            defaultValue={user.Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button type="submit">Update</button>
          <br />
          <div>or</div>
          <Link to={`/users/:Username`}>
            <button>Delete my Account</button>
          </Link>
        </form>
      </div>
      <br />

      <h3>Favorites:</h3>
      {favoriteMovies.map((movies) => {
        return (
          <div key={movies._id}>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <h4>{movies.Title}</h4>
              <button>Remove from Favorites</button>
            </Link>
          </div>
        );
      })}
    </>
  );
};
