import React, { useReducer, useState, useEffect } from "react";
import { reducerFunction } from "../../Reducers/Wishlist/Reducer";
import { WishListContext } from "./WishlistContext";

import axios from "axios";

const API = "https://buygames-backend.manmodesanket.repl.co/products/";

export const WishListProvider = ({ children }) => {
  let [wishList, dispatch] = useReducer(reducerFunction, []);

  // const fetchProducts = async (wishList) => {
  //   const list = [];
  //   console.log(wishList);
  //   if (wishList) {
  //     console.log("hello");
  //     wishList.forEach(async (item) => {
  //       const product = await axios.get(API + item);
  //       //console.log(product);
  //       if (product.data.success) list.push(product.data.product);
  //       console.log(list);
  //     });
  //   }
  //   //console.log(list);
  //   return list;
  // };

  // useEffect(async () => {
  //   console.log("useEffect");
  //   const products = await fetchProducts(wishList);
  //   console.log(products);
  //   setWishListData(products);
  // }, [wishList]);
  return (
    <WishListContext.Provider value={{ wishList, wishListDispatch: dispatch }}>
      {children}
    </WishListContext.Provider>
  );
};
