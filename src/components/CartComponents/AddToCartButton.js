import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useCartList } from "../../context/CartContext/CartContext";
import makeApiCall from "../../server/server.request";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const AddToCartButton = ({
  id,
  toastMessageList,
  setToastMessageList,
  classes,
}) => {
  let { cartList, cartDispatch } = useCartList();
  const [added, setAdded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const addedInCart = cartList.find((item) => item.id === id);

    if (addedInCart) {
      setAdded(true);
    }
  }, [cartList]);

  const handleAddToCart = async (
    item,
    cartList,
    cartDispatch,
    toastMessageList,
    setToastMessageList
  ) => {
    let isPresentInCart = cartList.find((itemInCart) => itemInCart.id === item);
    if (isPresentInCart === undefined || isPresentInCart === null) {
      const obj = createToastMessageList("Loading...");
      setToastMessageList([...toastMessageList, obj]);

      //make api call if success add to cart
      let data = { query: { username: user, cartItem: id, action: "add" } };
      let urlStr = process.env.REACT_APP_API_ROOT_URL + "cart";
      const { success } = await makeApiCall({
        url: urlStr,
        type: "post",
        data,
      });
      if (success) {
        const newItem = {
          id: item,
          quantity: 1,
          added: Date.now(),
        };
        cartDispatch({
          type: "ADD_TO_CART",
          payload: newItem,
        });
        const obj = createToastMessageList("Item added to cart");
        setToastMessageList([...toastMessageList, obj]);
        setAdded(true);
      } else {
        const obj = createToastMessageList("Item already in cart");
        setToastMessageList([...toastMessageList, obj]);
      }
    } else {
      const obj = createToastMessageList("Failed to Add to Cart");
      setToastMessageList([...toastMessageList, obj]);
    }
  };

  return (
    <button
      className={`btn ${[...classes]}`}
      onClick={() =>
        handleAddToCart(
          id,
          cartList,
          cartDispatch,
          toastMessageList,
          setToastMessageList
        )
      }
    >
      {added ? "Added To Cart" : "Add To Cart"}
    </button>
  );
};

export { AddToCartButton };
