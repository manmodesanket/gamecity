import React from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import makeApiCall from "../../server/server.request";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const RemoveFromWishList = ({
  id,
  classes,
  toastMessageList,
  setToastMessageList,
}) => {
  const { wishListDispatch } = useWishlist();
  const { user } = useAuth();

  const removeFromWishList = async (id) => {
    const obj = createToastMessageList("Loading...");
    setToastMessageList([...toastMessageList, obj]);
    let data = { query: { username: user, wishItem: id, action: "remove" } };
    let urlStr = process.env.REACT_APP_API_ROOT_URL + "wishlist";
    const { success } = await makeApiCall({
      url: urlStr,
      type: "post",
      data,
    });
    if (success) {
      wishListDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: id,
      });
      const obj = createToastMessageList("Item removed from wishlist");
      setToastMessageList([...toastMessageList, obj]);
    } else {
      const obj = createToastMessageList("Item removed from wishlist");
      setToastMessageList([...toastMessageList, obj]);
    }
  };

  return (
    <button className={`btn ${classes}`} onClick={() => removeFromWishList(id)}>
      Remove
    </button>
  );
};

export { RemoveFromWishList };
