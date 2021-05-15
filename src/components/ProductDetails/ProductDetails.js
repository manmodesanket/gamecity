import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";

const ProductDetails = (props) => {
  const { id } = props;
  const [game, setGame] = useState();
  const { productList } = useProductList();

  useEffect(() => {
    if (productList.length > 0) {
      const newGame = productList.find((item) => item._id === id);
      setGame(newGame);
    }
  }, [productList]);

  return (
    <div className="main-page">
      {game ? game.name : "Product Details not available"}
    </div>
  );
};

export { ProductDetails };
