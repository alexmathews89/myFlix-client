import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Avatar",
      director: "James Cameron",
      genre: "Science Fiction",
    },
    {
      id: 2,
      title: "Lord of the Rings",
      director: "Peter Jackson",
      genre: "Fantasy",
    },
    {
      id: 3,
      title: "Star Wars",
      director: "George Lucas",
      genre: "Science Fiction",
    },
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
