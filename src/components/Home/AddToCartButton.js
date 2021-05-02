import React, { useEffect, useState } from "react";
import { useCartList } from "../../context/CartContext/CartContext";

const AddToCartButton = (props) => {
  let { cartList, cartDispatch } = useCartList();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (item) => {
    cartDispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };

  useEffect(() => {
    if (cartList.includes(props.id)) {
      setAdded(true);
    }
  }, [cartList]);

  return (
    <button onClick={() => handleAddToCart(props.id)}>
      {added ? "Added To Cart" : "Add To Cart"}
    </button>
  );
};

export { AddToCartButton };
