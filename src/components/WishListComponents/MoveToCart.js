import React from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useCartList } from "../../context/CartContext/CartContext";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import makeApiCall from "../../server/server.request";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const MoveToCart = ({ id, classes, toastMessageList, setToastMessageList }) => {
  const { wishListDispatch } = useWishlist();
  const { cartDispatch } = useCartList();
  const { user } = useAuth();

  const moveToCart = async (id) => {
    let obj = createToastMessageList("Loading...");
    setToastMessageList([...toastMessageList, obj]);
    wishListDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: id,
    });
    obj = createToastMessageList("Item removed from wishlist");
    setToastMessageList([...toastMessageList, obj]);
    const newItem = {
      id,
      quantity: 1,
      added: Date.now(),
    };
    cartDispatch({
      type: "ADD_TO_CART",
      payload: newItem,
    });
    obj = createToastMessageList("Item moved to cart");
    setToastMessageList([...toastMessageList, obj]);
    let data = { query: { username: user, wishItem: id, action: "remove" } };
    let urlStr = process.env.REACT_APP_API_ROOT_URL + "wishlist";
    await makeApiCall({
      url: urlStr,
      type: "post",
      data,
    });
    data = { query: { username: user, cartItem: id, action: "add" } };
    urlStr = process.env.REACT_APP_API_ROOT_URL + "cart";
    let cartResponse = await makeApiCall({
      url: urlStr,
      type: "post",
      data,
    });
    if (cartResponse.success === false) {
      const obj = createToastMessageList("Item already in cart");
      setToastMessageList([...toastMessageList, obj]);
    }
  };

  return (
    <button className={`btn ${classes}`} onClick={() => moveToCart(id)}>
      Move To Cart
    </button>
  );
};

export { MoveToCart };
