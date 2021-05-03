import React, { useReducer, useState, useEffect } from "react";
import { reducerFunction } from "../../Reducers/Reducer";
import { ProductContext } from "./ProductContext";

import axios from "axios";

const API = "https://buygames-backend.manmodesanket.repl.co/products";

export const ProductProvider = ({ children }) => {
  let [productList, dispatch] = useReducer(reducerFunction, []);
  let [initialList, setInitialList] = useState([]);
  let [clearFilter, setClearFilter] = useState(false);
  let [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const products = await axios.get(API);
    if (products.data.success) {
      setInitialList(products.data.products);
      return products.data.products;
    }
    return null;
  };

  useEffect(async () => {
    const products = await fetchProducts();
    dispatch({
      type: "PRODUCT_LIST",
      payload: products,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (clearFilter) {
      dispatch({
        type: "PRODUCT_LIST",
        payload: initialList,
      });
      setClearFilter(false);
    }
  }, [clearFilter]);

  return (
    <ProductContext.Provider
      value={{
        productList,
        productListDispatch: dispatch,
        setClearFilter,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
