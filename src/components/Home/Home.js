import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { WishListButton } from "../WishListButton/WishListButton";
import { AddToCartButton } from "./AddToCartButton";
import { Filters } from "../Filters/Filters";
import { Toast } from "../Toast/Toast";

const Home = () => {
  const { productList, loading } = useProductList();
  let [toastMessageList, setToastMessageList] = useState([]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export { Home };
