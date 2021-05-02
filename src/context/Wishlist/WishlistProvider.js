import React, { useReducer } from "react";
import { reducerFunction } from "../../Reducers/Wishlist/Reducer";
import { WishListContext } from "./WishlistContext";

export const WishListProvider = ({ children }) => {
  let [wishList, dispatch] = useReducer(reducerFunction, []);

  return (
    <WishListContext.Provider value={{ wishList, wishListDispatch: dispatch }}>
      {children}
    </WishListContext.Provider>
  );
};
