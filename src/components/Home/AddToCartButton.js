import React, { useEffect, useState } from "react";
import { useCartList } from "../../context/CartContext/CartContext";
import { createToastMessageList } from "../../Utilities/UtilityFunctions";

const AddToCartButton = ({ id, toastMessageList, setToastMessageList }) => {
  let { cartList, cartDispatch } = useCartList();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (item) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
    const obj = createToastMessageList("Item added to cart");
    setToastMessageList([...toastMessageList, obj]);
  };

  useEffect(() => {
    if (cartList.includes(id)) {
      setAdded(true);
    }
  }, [cartList]);

  return (
    <button className="btn btn-card" onClick={() => handleAddToCart(id)}>
      {added ? "Added To Cart" : "Add To Cart"}
    </button>
  );
};

export { AddToCartButton };
