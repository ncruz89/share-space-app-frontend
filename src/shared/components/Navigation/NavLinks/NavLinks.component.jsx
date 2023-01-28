import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../Context/auth.context";

import "./NavLinks.styles.css";

// NavLinks component
// renders a list of nav links dependent on loggedIn state
const NavLinks = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  const handleLogout = () => logout();

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!isLoggedIn ? (
        <li>
          <NavLink to="/login">LOGIN</NavLink>
        </li>
      ) : (
        <li>
          <button to="/" onClick={handleLogout}>
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
