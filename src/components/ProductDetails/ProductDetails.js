import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { AddToCartButton } from "../CartComponents/AddToCartButton";
import { Toast } from "../Toast/Toast";
import { WishListButton } from "../WishListComponents/WishListButton";
import { findProductById } from "../../Utilities/UtilityFunctions";

const ProductDetails = (props) => {
  const { id } = props;
  const [game, setGame] = useState();
  const { productList } = useProductList();
  let [toastMessageList, setToastMessageList] = useState([]);

  useEffect(() => {
    let newGame = findProductById(productList, id);
    setGame(newGame);
  }, [productList, id]);

  return (
    <main className="main-page">
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
    </main>
  );
};

const GameDetails = ({ game, setToastMessageList, toastMessageList }) => {
  return (
    <section>
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
          {game.stock === 0 && (
            <p className="out__of__stock">Product is out of Stock!</p>
          )}
          {game.stock > 0 && (
            <AddToCartButton
              id={game._id}
              classes={["btn-cart"]}
              setToastMessageList={setToastMessageList}
              toastMessageList={toastMessageList}
            />
          )}
        </div>
      </div>
      <div>
        <h2>Product Description</h2>
        <p>{game.description}</p>
      </div>
    </section>
  );
};

export default ProductDetails;
