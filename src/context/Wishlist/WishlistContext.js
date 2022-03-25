import { createContext, useContext } from "react";

export const WishListContext = createContext();

export function useWishlist() {
  return useContext(WishListContext);
}
