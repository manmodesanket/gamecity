import React, { useEffect, useState } from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const WishListButton = ({
  id,
  toastMessageList,
  setToastMessageList,
  classes,
}) => {
  const { wishList, wishListDispatch } = useWishlist();
  const [added, setAdded] = useState(false);

  const handleWishList = (item) => {
    let isPresentInCart = wishList.find((itemInCart) => itemInCart === item);
    if (isPresentInCart === undefined || isPresentInCart === null) {
      wishListDispatch({
        type: "ADD_TO_WISHLIST",
        payload: item,
      });
      const obj = createToastMessageList("Item added to wishlist");
      setToastMessageList([...toastMessageList, obj]);
    } else {
      const obj = createToastMessageList("Item already in Wishlist");
      setToastMessageList([...toastMessageList, obj]);
    }
  };

  useEffect(() => {
    if (wishList.includes(id)) {
      setAdded(true);
    }
  }, [wishList]);

  return (
    <button
      className={`btn ${[...classes]}`}
      onClick={() => handleWishList(id)}
    >
      {added ? "Added To Wishlist" : "Add To Wishlist"}
    </button>
  );
};

export { WishListButton };
