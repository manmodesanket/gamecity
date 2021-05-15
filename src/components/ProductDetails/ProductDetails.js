import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { AddToCartButton } from "../Home/AddToCartButton";

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
      {game ? <GameDetails game={game} /> : "Product Details not available"}
    </div>
  );
};

const GameDetails = ({ game }) => {
  return (
    <div className="game-details_card">
      <div className="image-wrapper__outer">
        <div className="image-wrapper_inner">
          <img src={game.image} alt={game.name} className="image-holder" />
        </div>
      </div>
      <div className="game_details">
        <h1 className="product-name">{game.name}</h1>
        <div className="product-card__publisher">{game.publisher}</div>
        <h1 className="product-price">Rs.{game.price}</h1>
        <AddToCartButton id={game._id} />
      </div>
    </div>
  );
};

export { ProductDetails };
