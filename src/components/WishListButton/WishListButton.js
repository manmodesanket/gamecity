import React, { useEffect, useState } from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const WishListButton = ({ id, toastMessageList, setToastMessageList }) => {
  const { wishList, wishListDispatch } = useWishlist();
  const [added, setAdded] = useState(false);

  const handleWishList = (item) => {
    wishListDispatch({
      type: "ADD_TO_WISHLIST",
      payload: item,
    });
    const obj = createToastMessageList("Item added to wishlist");
    setToastMessageList([...toastMessageList, obj]);
  };

  useEffect(() => {
    if (wishList.includes(id)) {
      setAdded(true);
    }
  }, [wishList]);

  return (
    <button onClick={() => handleWishList(id)}>
      {added ? "Wishlisted" : "Wishlist"}
    </button>
  );
};

export { WishListButton };
