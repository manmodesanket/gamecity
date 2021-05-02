import React, { useReducer } from "react";
import { reducerFunction } from "../../Reducers/Wishlist/Reducer";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  let [cartList, dispatch] = useReducer(reducerFunction, []);

  return (
    <CartContext.Provider value={{ cartList, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
