import React from "react";
import { Router } from "@reach/router";

import Account from "./components/Account/Account";
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
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import { AuthProvider } from "./context/AuthContext/AuthProvider";

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
                <Wishlist path="/wishlist" />
                <Cart path="/cart" />
                <Login path="/login" />
                <Signup path="/signup" />
                <Account path="/account" />
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
