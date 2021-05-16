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
  const handleAddToCart = (item) => {
    const newItem = {
      id: item,
      added: Date.now(),
    };
    cartDispatch({
      type: "ADD_TO_CART",
      payload: newItem,
    });
    //const obj = createToastMessageList("Item added to cart");
    //setToastMessageList([...toastMessageList, obj]);
  };

  useEffect(() => {
    const item = cartList.find((item) => item.id === id);
    if (item) {
      setAdded(true);
    }
  }, [cartList]);

  return (
    <button
      className={`btn ${[...classes]}`}
      onClick={() => handleAddToCart(id)}
    >
      {added ? "Added To Cart" : "Add To Cart"}
    </button>
  );
};

export { AddToCartButton };
