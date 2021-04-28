import React, { useReducer, useState, useEffect } from "react";
import { reducerFunction } from "../../Reducers/Wishlist/Reducer";
import { ProductContext } from "./ProductContext";

import axios from "axios";

const API = "https://buygames-backend.manmodesanket.repl.co/products";

export const ProductProvider = ({ children }) => {
  let [productList, dispatch] = useReducer(reducerFunction, []);

  const fetchProducts = async () => {
    const products = await axios.get(API);
    if (products.data.success) return products.data.products;
    return null;
  };

  useEffect(async () => {
    const products = await fetchProducts();
    dispatch({ type: "PRODUCT_LIST", payload: products });
  }, []);

  return (
    <ProductContext.Provider
      value={{ productList, productListDispatch: dispatch }}
    >
      {children}
    </ProductContext.Provider>
  );
};
