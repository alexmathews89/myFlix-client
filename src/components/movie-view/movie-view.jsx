import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MovieView = ({ movies }) => {
  const { movieID } = useParams();
  const movie = movies.find((m) => m._id === movieID);

  return (
    <div className="main-item">
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
      <div>
        <img src={movie.Image} />
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
