import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { useAuth } from "../../context/AuthContext/AuthContext";

const Navbar = (props) => {
  const { user } = useAuth();
  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__title">
          <Link to="/" className="navabar__heading">
            GameCity
          </Link>
        </div>
        <div className="navbar__nav">
          <NavbarNav linkName={"Home"} path="/" location={props.location} />
          <NavbarNav
            linkName={"Products"}
            path="/products"
            location={props.location}
          />
          {user && (
            <NavbarNav
              linkName={"Wishlist"}
              path="/wishlist"
              location={props.location}
            />
          )}
          {user && (
            <NavbarNav
              linkName={"Cart"}
              path="/cart"
              location={props.location}
            />
          )}
          {user && (
            <NavbarNav
              linkName={"Account"}
              path="/account"
              location={props.location}
            />
          )}
          {!user && (
            <NavbarNav
              linkName={"Login"}
              path="/login"
              location={props.location}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const NavLink = (props) => {
  return <Link {...props} className="link navbar__nav__links" />;
};

const NavbarNav = ({ linkName, path, location }) => {
  let [styleObj, setStyleObj] = useState();
  useEffect(() => {
    if (location.pathname === path) {
      setStyleObj(true);
    } else {
      setStyleObj(false);
    }
  }, [location]);
  return (
    <NavLink
      to={`${path}`}
      style={{ borderBottom: styleObj ? "3px solid whitesmoke" : null }}
    >
      {linkName}
    </NavLink>
  );
};

export default Navbar;
