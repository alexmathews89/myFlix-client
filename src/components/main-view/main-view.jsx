import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Avatar" },
    { id: 2, title: "Lord of the Rings" },
    { id: 3, title: "Star Wars" },
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </div>
  );
};
