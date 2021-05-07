import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { WishListButton } from "../WishListButton/WishListButton";
import { AddToCartButton } from "./AddToCartButton";
import { Filters } from "../Filters/Filters";
import { Toast } from "../Toast/Toast";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import { useCartList } from "../../context/CartContext/CartContext";

const Home = () => {
  const { productList, loading } = useProductList();
  const { wishList } = useWishlist();
  const { cartList } = useCartList();
  let [toastMessageList, setToastMessageList] = useState([]);

  useEffect(() => {
    if (wishList.length > 0) {
      const list = createToastMessageList("Item added to Wishlist");
      //setToastMessageList([...toastMessageList, "Item added to Wishlist"]);
      setToastMessageList([...toastMessageList, list]);
    }
  }, [wishList]);

  useEffect(() => {
    if (cartList.length > 0) {
      const list = createToastMessageList("Item added to Cart");
      //setToastMessageList([...toastMessageList, "Item added to Cart"]);
      setToastMessageList([...toastMessageList, list]);
    }
  }, [cartList]);

  const createToastMessageList = (msg) => {
    const toastId = Math.floor(Math.random() * 100);
    const obj = {
      id: toastId,
      message: msg,
    };
    return obj;
  };

  return (
    <div>
      <h1>Home</h1>
      <Filters />
      <div className="products">
        {productList.length > 0
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
          : loading
          ? "Loading..."
          : "No Products available"}
      </div>
      <Toast
        toastMessageList={toastMessageList ? toastMessageList : null}
        setToastMessageList={setToastMessageList}
      />
    </div>
  );
};

export { Home };
