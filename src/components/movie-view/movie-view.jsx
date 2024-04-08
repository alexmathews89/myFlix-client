export const MovieView = ({ movie }) => {
  return (
    <div>
      <div>
        <span>Title:</span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.genre}</span>
      </div>
    </div>
  );
};
