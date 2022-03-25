import React, { useReducer, useState, useEffect } from "react";
import { reducerFunction } from "../../Reducers/Reducer";
import { ProductContext } from "./ProductContext";
import makeApiCall from "../../server/server.request";

const ProductProvider = ({ children }) => {
  let [productList, dispatch] = useReducer(reducerFunction, []);
  let [initialList, setInitialList] = useState([]);
  let [includeOutOfStock, setIncludeOutOfStock] = useState(false);
  let [clearFilter, setClearFilter] = useState(false);
  let [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    let urlStr = process.env.REACT_APP_API_ROOT_URL + "products";
    const { response } = await makeApiCall({
      type: "get",
      url: urlStr,
      data: null,
    });
    if (response.success) {
      setInitialList(response.products);
      return response.products;
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
        includeOutOfStock,
        setIncludeOutOfStock,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
