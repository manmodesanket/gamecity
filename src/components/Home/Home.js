import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { WishListButton } from "../WishListButton/WishListButton";
import { AddToCartButton } from "./AddToCartButton";
import { Filters } from "../Filters/Filters";

const Home = () => {
  const { productList } = useProductList();

  return (
    <div>
      <h1>Home</h1>
      <Filters />
      <div className="products">
        {productList
          ? productList.map((item, i) => (
              <div key={i} className="card">
                <div className="card-name">{item.name}</div>
                <div>
                  <WishListButton id={item._id} />
                </div>
                <div>
                  <AddToCartButton id={item._id} />
                </div>
                <div>Rs.{item.price}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export { Home };
