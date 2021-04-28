import axios from "axios";
import React, { useState, useEffect } from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";

const API = "https://buygames-backend.manmodesanket.repl.co/products/";

const Wishlist = () => {
  const [productList, setProductList] = useState([]);

  let { wishList } = useWishlist();

  console.log(productList);
  return (
    <div>
      <h1>Wishlist</h1>
      <div className="products">
        {wishList
          ? wishList.map((item, i) => (
              <div key={i} className="card">
                <div className="card-name">{item.name}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export { Wishlist };
