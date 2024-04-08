import { useState } from "react";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  return (
    <div>
      <div>Avatar</div>
      <div>Lord of the Rings</div>
      <div>Star Wars</div>
    </div>
  );
};
