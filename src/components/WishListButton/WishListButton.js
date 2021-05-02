import React, { useEffect, useState } from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";

const WishListButton = (props) => {
  const { wishList, wishListDispatch } = useWishlist();
  const [added, setAdded] = useState(false);

  const handleWishList = (item) => {
    wishListDispatch({
      type: "ADD_TO_WISHLIST",
      payload: item,
    });
  };

  useEffect(() => {
    if (wishList.includes(props.id)) {
      setAdded(true);
    }
  }, [wishList]);

  return (
    <button onClick={() => handleWishList(props.id)}>
      {added ? "Wishlisted" : "Wishlist"}
    </button>
  );
};

export { WishListButton };
