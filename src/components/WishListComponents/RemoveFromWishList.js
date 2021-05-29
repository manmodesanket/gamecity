import React from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const RemoveFromWishList = ({
  id,
  classes,
  toastMessageList,
  setToastMessageList,
}) => {
  const { wishList, wishListDispatch } = useWishlist();

  const removeFromWishList = (id) => {
    wishListDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: id,
    });
    const obj = createToastMessageList("Item removed from wishlist");
    setToastMessageList([...toastMessageList, obj]);
  };

  return (
    <button className={`btn ${classes}`} onClick={() => removeFromWishList(id)}>
      Remove
    </button>
  );
};

export { RemoveFromWishList };
