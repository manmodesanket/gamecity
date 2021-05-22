import React from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";

const RemoveFromWishList = ({ id, classes }) => {
  const { wishList, wishListDispatch } = useWishlist();

  const removeFromWishList = (id) => {
    wishListDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: id,
    });
  };

  return (
    <button className={`btn ${classes}`} onClick={() => removeFromWishList(id)}>
      Remove
    </button>
  );
};

export { RemoveFromWishList };
