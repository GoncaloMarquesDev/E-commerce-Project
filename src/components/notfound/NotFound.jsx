import { Link } from "react-router";
/* import "./NotFound.scss"; */

function NotFound() {
  return (
    <div className="notfound-wrapper">
      <h1>404</h1>
      <p>Oops! Not Found.</p>
      <Link to="/" className="btn-home">
        BAck
      </Link>
    </div>
  );
}

export default NotFound;
