import "./Nav.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import SearchBar from "../searchbar/SearchBar";

function Nav() {
  return (
    <div className="nav_wrapper">
      <div className="nav">
        <img className="logo" src={logo} alt="" />

        <div className="nav-flex">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>

          <ul className="nav-items">
            <SearchBar />
            <li>
              <Link to="/">Log in</Link>
            </li>
            <li>
              <Link to="/cart">Shop Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Nav;
