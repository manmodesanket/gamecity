import React from "react";
import { Router } from "@reach/router";

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { Cart } from "./components/Cart/Cart";
import { WishListProvider } from "./context/Wishlist/WishlistProvider";

import "../main.css";
import { ProductProvider } from "./context/ProductContext/ProductProvider";

const App = () => {
  return (
    <ProductProvider>
      <WishListProvider>
        <Navbar />
        <Router>
          <Home path="/" />
          <Wishlist path="/wishlist" />
          <Cart path="/cart" />
        </Router>
      </WishListProvider>
    </ProductProvider>
  );
};

export default App;
