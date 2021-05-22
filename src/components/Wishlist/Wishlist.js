import React, { useState, useEffect } from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { RemoveFromWishList } from "./RemoveFromWishList";
import { Link } from "@reach/router";

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
    <div className="main-page">
      <h1>Wishlist</h1>
      <div className="cart__products">
        {itemList.length > 0
          ? itemList.map((item, i) => (
              <div key={item._id} className="cart_card__wrapper">
                <Link
                  className="wishlist-link"
                  to={`/product-details/${item._id}`}
                >
                  <div key={i} className="cart__card">
                    <div className="cart__card__img">
                      <div className="cart__image-container">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart__card__image"
                        />
                      </div>
                    </div>
                    <div className="card-name">{item.name}</div>
                  </div>
                </Link>
                <RemoveFromWishList
                  id={item._id}
                  classes={["cart__product__actions__remove__btn"]}
                />
              </div>
            ))
          : "Empty"}
      </div>
    </div>
  );
};

export { Wishlist };
