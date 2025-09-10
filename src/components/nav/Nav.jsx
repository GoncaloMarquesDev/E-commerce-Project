import "./Nav.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

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
             <Link to="/about">About</Link> 
          </li>
        </ul>

        <ul className="nav-items">
          <input
            className="nav-input"
            type="text"
            placeholder="search product here.."
          />
          <li>
            <Link to="/">Log in</Link>
          </li>
          <li>
           <Link to="/">Shop Cart</Link> 
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
}
export default Nav;
