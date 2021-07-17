import React, { useEffect, useReducer } from "react";
import { reducerFunction } from "../../Reducers/Reducer";
import makeApiCall from "../../server/server.request";
import { useAuth } from "../AuthContext/AuthContext";
import { WishListContext } from "./WishlistContext";

const WishListProvider = ({ children }) => {
  let [wishList, dispatch] = useReducer(reducerFunction, []);

  let { user } = useAuth();

  useEffect(async () => {
    let urlStr = process.env.REACT_APP_API_ROOT_URL + "wishlist";
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
      if (success === true && response.wishlistForUser !== null) {
        dispatch({
          type: "WISH_LIST",
          payload: response.wishlistForUser.wishlist,
        });
      }
    }
  }, [user]);

  return (
    <WishListContext.Provider value={{ wishList, wishListDispatch: dispatch }}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListProvider;
