import React from "react";
import { useWishlist } from "../../context/Wishlist/WishlistContext";

const Wishlist = () => {
  let { wishList } = useWishlist();
  return (
    <div>
      <h1>Wishlist</h1>
    </div>
  );
};

export { Wishlist };
