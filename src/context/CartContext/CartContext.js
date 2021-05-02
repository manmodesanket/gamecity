import { createContext, useContext } from "react";

export const CartContext = createContext();

export function useCartList() {
  return useContext(CartContext);
}
