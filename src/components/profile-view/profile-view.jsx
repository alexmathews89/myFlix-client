import React, { useState, useEffect } from "react";

export const ProfileView = ({ user, movies }) => {
  //const storedUser = JSON.parse(localStorage.getItem("user"));
  //const storedToken = localStorage.getItem("token");
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const handleSubmit = (event) => {};

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
        <form
          onSubmit={(e) => {
            handleSubmit;
          }}
        >
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
        </form>
      </div>
    </>
  );
};
