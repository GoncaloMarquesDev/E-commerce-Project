import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import SearchBar from "../searchbar/SearchBar";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../../context/CartContext";

import MiniCart from "../minicart/MiniCart";

import "../nav/Nav.scss";

function Nav() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [menuActive, setMenuActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="nav_wrapper" ref={menuRef}>
      <div className="nav">
        <img className="logo" src={logo} alt="Logo" />

        {/* Hamburger no mesmo sítio que estava */}
        <div className="menu-toggle" onClick={() => setMenuActive(!menuActive)}>
          &#9776;
        </div>

        <ul className={`nav-links ${menuActive ? "active" : ""}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/category/1">Clothes </NavLink>
          </li>
          <li>
            <NavLink to="/category/2">Electronics</NavLink>
          </li>
          <li>
            <NavLink to="/category/3">Furniture</NavLink>
          </li>
          <li>
            <NavLink to="/category/4">Shoes</NavLink>
          </li>
        </ul>

        <div className="nav-items">
          <SearchBar />

          <li
        className="cart-icon"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
        style={{ position: "relative" }}
      >
        <Link to="/cart">
          <PiShoppingCartSimpleLight size={40} />
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </Link>

        {isDropdownOpen && totalItems > 0 && (
          <div className="cart-dropdown">
            <MiniCart isPreview />
          </div>
        )}
      </li>
        {/*   <li className="cart-icon">
            <Link to="/cart">
              <PiShoppingCartSimpleLight size={40} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          </li> */}

        </div>
      </div>
    </div>
  );
}

export default Nav;
