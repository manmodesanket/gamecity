import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div>
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
        <NavbarNav
          linkName={"Wishlist"}
          path="/wishlist"
          location={props.location}
        />
        <NavbarNav linkName={"Cart"} path="/cart" location={props.location} />
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
      style={{ borderBottom: styleObj ? "5px solid whitesmoke" : null }}
    >
      {linkName}
    </NavLink>
  );
};

export { Navbar };
