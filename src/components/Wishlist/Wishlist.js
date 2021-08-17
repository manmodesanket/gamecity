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
    <main className="main-page">
      <section>
        <h1>Wishlist</h1>
      </section>
      <section className="cart__products">
        {itemList.length > 0
          ? itemList.map((item, i) => (
              <article key={item._id} className="cart_card__wrapper">
                <WishListItem item={item} />
                <RemoveFromWishList
                  id={item._id}
                  classes={["cart__product__actions__remove__btn"]}
                  toastMessageList={toastMessageList}
                  setToastMessageList={setToastMessageList}
                />
              </article>
            ))
          : "Empty"}
      </section>
      <Toast
        toastMessageList={toastMessageList}
        setToastMessageList={setToastMessageList}
      />
    </main>
  );
};

export default Wishlist;
