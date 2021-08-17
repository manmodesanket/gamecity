import React from "react";

export default function CartItem({ item }) {
  return (
    <article className="cart_card__wrapper">
      <div className="cart__card">
        <div className="cart__card__img">
          <div className="cart__image-container">
            <img
              src={item.image}
              alt={item.name}
              className="cart__card__image"
            />
          </div>
        </div>
        <div className="cart__card__details">
          <div className="cart_card_details_wrapper">
            <div className="cart__card__name">{item.name}</div>
            <div className="cart__card_platform">
              Platform:{" "}
              {item.platform === 1
                ? "PlayStation 5"
                : item.platform === 2
                ? "Xbox Series X"
                : null}
            </div>
            <div className="cart__card_publisher">
              Publisher: {item.publisher}
            </div>
            <div className="cart_card__price">
              Rs.{item.price * item.quantity}
            </div>
          </div>
        </div>
      </div>
      <div className="cart__product__actions">
        <div className="product_quantity">
          <button
            onClick={() => handleQuantity(item._id, "DESC")}
            className="btn cart__card__quantity__btn product_quantity__element"
          >
            -
          </button>
          <div className="product_quantity__element">{item.quantity}</div>

          <button
            onClick={() => handleQuantity(item._id, "INC")}
            className="btn cart__card__quantity__btn product_quantity__element"
          >
            +
          </button>
        </div>
        <button
          onClick={() => handleCartRemove(item._id)}
          className="btn cart__product__actions__remove__btn"
        >
          Remove
        </button>
      </div>
    </article>
  );
}
