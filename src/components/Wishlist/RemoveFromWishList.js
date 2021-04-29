import React from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";

const RemoveFromWishList = (props) => {
  const { wishList, wishListDispatch } = useWishlist();

  const removeFromWishList = (id) => {
    wishListDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: id,
    });
  };

  return <button onClick={() => removeFromWishList(props.id)}>Remove</button>;
};

export { RemoveFromWishList };
