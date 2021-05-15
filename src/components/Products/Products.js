import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { WishListButton } from "../WishListButton/WishListButton";
import { AddToCartButton } from "../Home/AddToCartButton";
import { Filters } from "../Filters/Filters";
import { Toast } from "../Toast/Toast";
import { Link } from "@reach/router";

const ProductsPage = () => {
  const { productList, loading } = useProductList();
  let [toastMessageList, setToastMessageList] = useState([]);

  return (
    <div className="main-page">
      {productList.length > 0 ? <Filters /> : null}
      <div className="products">
        {productList.length > 0
          ? productList.map((item, i) => (
              <div key={i} className="product__wrapper">
                <Link
                  className="product-link"
                  to={`/product-details/${item._id}`}
                >
                  <div className="product__card">
                    <div className="product__card__img">
                      <div className="image-container">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="card__image"
                        />
                      </div>
                    </div>
                    <div className="product__card__details">
                      <div className="product__card__name">{item.name}</div>
                      <div className="product-card__publisher">
                        {item.publisher}
                      </div>
                      <div className="product__card__price">
                        Rs.{item.price}
                      </div>
                      <div className="product__card__rating">
                        {item.rating}★
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : loading
          ? "Loading..."
          : "No Products available"}
      </div>
      <Toast
        toastMessageList={toastMessageList ? toastMessageList : null}
        setToastMessageList={setToastMessageList}
      />
    </div>
  );
};

export { ProductsPage };

/*
<img
                    src={item.image}
                    alt={item.name}
                    className="product-card__image"
                  />*/
