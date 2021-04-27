import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>Home</li>
        <li>
          <Link to="/wishlist">Wishist</Link>
        </li>
        <li>Cart</li>
      </ul>
    </div>
  );
};

export { Navbar };
