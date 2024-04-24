import "./movie-view.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <Row className="justify-content-md-center">
        <div>
          <span>Title:</span>
          <span>{movie.Title}</span>
        </div>
      </Row>
      <div>
        <span>Director:</span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.Genre.Name}</span>
      </div>
      <button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
};
