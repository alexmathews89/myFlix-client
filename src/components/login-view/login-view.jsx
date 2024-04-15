import React from "react";

export const LoginView = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      access: username,
      secret: password,
    };

    fetch("https://myflixapp-495f4f3fbc03.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  retrun(
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
