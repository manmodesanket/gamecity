import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishist</Link>
        </li>
        <li>Cart</li>
      </ul>
    </div>
  );
};

export { Navbar };
