import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { RemoveFromWishList } from "../WishListComponents/RemoveFromWishList";
import { findProductById } from "../../Utilities/UtilityFunctions";
import { Toast } from "../Toast/Toast";
import WishListItem from "./WishListItem";

const Wishlist = () => {
  let { wishList } = useWishlist();
  const { productList } = useProductList();
  let [itemList, setItemList] = useState([]);
  let [toastMessageList, setToastMessageList] = useState([]);

  useEffect(() => {
    let list = [];
    for (let i = 0; i < wishList.length; i++) {
      const obj = findProductById(productList, wishList[i]);
      list.push(obj);
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
                <WishListItem item={item} />
                <RemoveFromWishList
                  id={item._id}
                  classes={["cart__product__actions__remove__btn"]}
                  toastMessageList={toastMessageList}
                  setToastMessageList={setToastMessageList}
                />
              </div>
            ))
          : "Empty"}
      </div>
      <Toast
        toastMessageList={toastMessageList}
        setToastMessageList={setToastMessageList}
      />
    </div>
  );
};

export default Wishlist;
