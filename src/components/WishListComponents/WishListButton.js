import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useWishlist } from "../../context/Wishlist/WishlistContext";
import makeApiCall from "../../server/server.request";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const WishListButton = ({
  id,
  toastMessageList,
  setToastMessageList,
  classes,
}) => {
  const { wishList, wishListDispatch } = useWishlist();
  const [added, setAdded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (wishList.includes(id)) {
      setAdded(true);
    }
  }, [wishList]);

  const addToWishList = async (
    item,
    wishList,
    wishListDispatch,
    toastMessageList,
    setToastMessageList
  ) => {
    let isPresentInCart = wishList.find((itemInCart) => itemInCart === item);
    if (isPresentInCart === undefined || isPresentInCart === null) {
      const obj = createToastMessageList("Loading...");
      setToastMessageList([...toastMessageList, obj]);

      //make api call if success add to cart
      let data = { query: { username: user, wishItem: id, action: "add" } };
      let urlStr = process.env.REACT_APP_API_ROOT_URL + "wishlist";
      const { success } = await makeApiCall({
        url: urlStr,
        type: "post",
        data,
      });
      if (success) {
        wishListDispatch({
          type: "ADD_TO_WISHLIST",
          payload: item,
        });
        const obj = createToastMessageList("Item added to wishlist");
        setToastMessageList([...toastMessageList, obj]);
      } else {
        const obj = createToastMessageList("Failed to add in Wishlist.");
        setToastMessageList([...toastMessageList, obj]);
      }
    } else {
      const obj = createToastMessageList("Item already in Wishlist");
      setToastMessageList([...toastMessageList, obj]);
    }
  };

  return (
    <button
      className={`btn ${[...classes]}`}
      onClick={() =>
        addToWishList(
          id,
          wishList,
          wishListDispatch,
          toastMessageList,
          setToastMessageList
        )
      }
    >
      {added ? "Added To Wishlist" : "Add To Wishlist"}
    </button>
  );
};

export { WishListButton };
