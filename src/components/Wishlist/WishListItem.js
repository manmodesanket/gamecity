import React from "react";
import { Link } from "@reach/router";

export default function WishListItem({ item }) {
  return (
    <Link className="wishlist-link" to={`/product-details/${item._id}`}>
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
        <div className="card-name">{item.name}</div>
      </div>
    </Link>
  );
}
