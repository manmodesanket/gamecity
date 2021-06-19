import { createContext, useContext } from "react";

export const ProductContext = createContext();

export function useProductList() {
  return useContext(ProductContext);
}
