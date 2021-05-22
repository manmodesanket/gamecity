import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { AddToCartButton } from "../Home/AddToCartButton";
import { Toast } from "../Toast/Toast";
import { WishListButton } from "../WishListButton/WishListButton";

const ProductDetails = (props) => {
  const { id } = props;
  const [game, setGame] = useState();
  const { productList } = useProductList();
  let [toastMessageList, setToastMessageList] = useState([]);

  //console.log(toastMessageList);
  useEffect(() => {
    if (productList.length > 0) {
      let newGame = productList.find((item) => item._id === id);
      setGame(newGame);
    }
  }, [productList]);

  return (
    <div className="main-page">
      {game ? (
        <GameDetails
          game={game}
          setToastMessageList={setToastMessageList}
          toastMessageList={toastMessageList}
        />
      ) : (
        "Product Details not available"
      )}
      <Toast
        toastMessageList={toastMessageList}
        setToastMessageList={setToastMessageList}
      />
    </div>
  );
};

const GameDetails = ({ game, setToastMessageList, toastMessageList }) => {
  return (
    <div className="main-page">
      <div className="game-details_card">
        <div className="image-wrapper__outer">
          <div className="image-wrapper_inner">
            <img src={game.image} alt={game.name} className="image-holder" />
          </div>
        </div>
        <div className="game_details">
          <h1 className="product-name">{game.name}</h1>
          <div className="product__publisher">{game.publisher}</div>
          <div className="product__rating">{game.rating}★</div>
          <h1 className="product-price">Rs.{game.price}</h1>
          <WishListButton
            id={game._id}
            classes={["btn-cart"]}
            setToastMessageList={setToastMessageList}
            toastMessageList={toastMessageList}
          />
          <AddToCartButton
            id={game._id}
            classes={["btn-cart"]}
            setToastMessageList={setToastMessageList}
            toastMessageList={toastMessageList}
          />
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
