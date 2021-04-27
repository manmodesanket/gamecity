import React, { useEffect, useState } from "react";
import axios from "axios";

import { useWishlist } from "../../context/Wishlist/WishlistContext";

const API = "https://buygames-backend.manmodesanket.repl.co/products";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const { wishListDispatch } = useWishlist();

  const handleWishList = (item) => {
    wishListDispatch({
      type: "ADD_TO_WISHLIST",
      payload: item,
    });
  };

  const fetchProducts = async () => {
    const products = await axios.get(API);
    if (products.data.success) return products.data.products;
    return null;
  };

  useEffect(async () => {
    const products = await fetchProducts();
    setProductList(products);
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div className="products">
        {productList
          ? productList.map((item, i) => (
              <div key={i} className="card">
                <div className="card-name">{item.name}</div>
                <div>
                  <button onClick={() => handleWishList(item)}>
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
