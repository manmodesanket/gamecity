import React from "react";
import { Link } from "@reach/router";

export default function Product({ item }) {
  return (
    <Link className="product-link" to={`/product-details/${item._id}`}>
      <div className="product__card">
        <div className="product__card__img">
          <figure className="image-container">
            <img src={item.image} alt={item.name} className="card__image" />
          </figure>
        </div>
        <div className="product__card__details">
          <div className="product__card__name">{item.name}</div>
          <div className="product__card__price">Rs.{item.price}</div>
          <div className="product__card__rating">{item.rating}★</div>
          {item.stock === 0 && (
            <span className="product__card__tags card__tag tag__error">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
