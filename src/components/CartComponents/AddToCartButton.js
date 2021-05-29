import React, { useEffect, useState } from "react";
import { useCartList } from "../../context/CartContext/CartContext";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const AddToCartButton = ({
  id,
  toastMessageList,
  setToastMessageList,
  classes,
}) => {
  let { cartList, cartDispatch } = useCartList();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (
    item,
    cartList,
    cartDispatch,
    toastMessageList,
    setToastMessageList
  ) => {
    let isPresentInCart = cartList.find((itemInCart) => itemInCart.id === item);
    if (isPresentInCart === undefined || isPresentInCart === null) {
      const newItem = {
        id: item,
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
