import React, { useState, useEffect } from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { RemoveFromWishList } from "./RemoveFromWishList";

const Wishlist = () => {
  let { wishList } = useWishlist();
  const { productList } = useProductList();
  let [itemList, setItemList] = useState([]);

  useEffect(() => {
    let list = [];
    for (let i = 0; i < wishList.length; i++) {
      for (let j = 0; j < productList.length; j++) {
        if (productList[j]._id === wishList[i]) {
          list.push(productList[j]);
        }
      }
    }
    setItemList(list);
  }, [wishList]);

  return (
    <div>
      <h1>Wishlist</h1>
      <div className="products">
        {itemList.length > 0
          ? itemList.map((item, i) => (
              <div key={i} className="card">
                <div className="card-name">{item.name}</div>
                <RemoveFromWishList id={item._id} />
              </div>
            ))
          : "Empty"}
      </div>
    </div>
  );
};

export { Wishlist };
