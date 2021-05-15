import React, { Children } from "react";
import { Router } from "@reach/router";

import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { ProductsPage } from "./components/Products/Products";
import { Wishlist } from "./components/Wishlist/Wishlist";
import { Cart } from "./components/Cart/Cart";
import { WishListProvider } from "./context/Wishlist/WishlistProvider";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";

import "../main.css";
import { ProductProvider } from "./context/ProductContext/ProductProvider";
import { CartProvider } from "./context/CartContext/CartProvider";

const App = () => {
  return (
    <ProductProvider>
      <WishListProvider>
        <CartProvider>
          <Router>
            <NavbarRouter path="/">
              <Home path="/" />
              <ProductsPage path="/products" />
              <ProductDetails path="/product-details/:id" />
              <Wishlist path="/wishlist" />
              <Cart path="/cart" />
            </NavbarRouter>
          </Router>
        </CartProvider>
      </WishListProvider>
    </ProductProvider>
  );
};

const NavbarRouter = (props) => {
  return (
    <div>
      <Navbar location={props.location} />
      {props.children}
    </div>
  );
};

export default App;
