import React from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useCartList } from "../../context/CartContext/CartContext";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import makeApiCall from "../../server/server.request";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const MoveToWishlist = ({
  id,
  toastMessageList,
  setToastMessageList,
  classes,
}) => {
  let { cartList, cartDispatch } = useCartList();
  let { wishListDispatch } = useWishlist();
  const { user } = useAuth();

  const handleMoveToCart = async (item) => {
    let isPresentInCart = cartList.find((itemInCart) => itemInCart.id === item);
    if (isPresentInCart) {
      wishListDispatch({
        type: "ADD_TO_WISHLIST",
        payload: item,
      });
      let obj = createToastMessageList("Item added to wishlist");
      setToastMessageList([...toastMessageList, obj]);
      cartDispatch({
        type: "REMOVE_FROM_CART",
        payload: item,
      });
      obj = createToastMessageList("Item remove from cart");
      setToastMessageList([...toastMessageList, obj]);
      let data = { query: { username: user, wishItem: item, action: "add" } };
      let urlStr = process.env.REACT_APP_API_ROOT_URL + "wishlist";
      const wishListResponse = await makeApiCall({
        url: urlStr,
        type: "post",
        data,
      });
      data = { query: { username: user, cartItem: item, action: "remove" } };
      urlStr = process.env.REACT_APP_API_ROOT_URL + "cart";
      const cartResponse = await makeApiCall({
        url: urlStr,
        type: "post",
        data,
      });
    }
  };

  return (
    <button
      className={`btn ${[...classes]}`}
      onClick={() => handleMoveToCart(id)}
    >
      MoveToWishList
    </button>
  );
};

export { MoveToWishlist };
