import React, { useEffect, useReducer } from "react";
import { reducerFunction } from "../../Reducers/Reducer";
import makeApiCall from "../../server/server.request";
import { useAuth } from "../AuthContext/AuthContext";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  let [cartList, dispatch] = useReducer(reducerFunction, []);
  let { user, token } = useAuth();

  useEffect(async () => {
    let urlStr = process.env.REACT_APP_API_ROOT_URL + "cart";
    let data = {
      params: {
        username: user,
      },
    };
    if (user != null) {
      const { success, response } = await makeApiCall({
        type: "get",
        url: urlStr,
        data,
      });
      if (success === true && response.cartForUser !== null) {
        dispatch({
          type: "CART_LIST",
          payload: response.cartForUser.cartList,
        });
      }
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cartList, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
