import React from "react";
import { Router } from "@reach/router";

import {
  Account,
  Navbar,
  Cart,
  Home,
  Login,
  ProductDetails,
  Privateroute,
  ProductsPage,
  Signup,
  Wishlist,
} from "./components/";

import {
  AuthProvider,
  CartProvider,
  ProductProvider,
  WishListProvider,
} from "./context/";

import "../main.css";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <WishListProvider>
          <CartProvider>
            <Router>
              <NavbarRouter path="/">
                <Home default path="/" />
                <ProductsPage path="/products" />
                <ProductDetails path="/product-details/:id" />
                <Privateroute Component={Wishlist} path="/wishlist" />
                <Privateroute Component={Cart} path="/cart" />
                <Login path="/login" />
                <Signup path="/signup" />
                <Privateroute Component={Account} path="/account" />
              </NavbarRouter>
            </Router>
          </CartProvider>
        </WishListProvider>
      </ProductProvider>
    </AuthProvider>
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
