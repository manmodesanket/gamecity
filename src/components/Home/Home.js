import React, { useEffect, useState } from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import { useProductList } from "../../context/ProductContext/ProductContext";

import axios from "axios";

const API = "https://buygames-backend.manmodesanket.repl.co/products";

const Home = () => {
  const { productList } = useProductList();
  const { wishListDispatch } = useWishlist();

  const handleWishList = (item) => {
    wishListDispatch({
      type: "ADD_TO_WISHLIST",
      payload: item,
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <div className="products">
        {productList
          ? productList.map((item, i) => (
              <div key={i} className="card">
                <div className="card-name">{item.name}</div>
                <div>
                  <button onClick={() => handleWishList(item._id)}>
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export { Home };

/*
{productList.map((item) => (
                <div>{item.name}</div>
            ))}*/
