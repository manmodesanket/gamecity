import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { Filters } from "../Filters/Filters";
import { Toast } from "../Toast/Toast";
import { Link } from "@reach/router";
import Loader from "react-loader-spinner";

const ProductsPage = () => {
  const { productList, loading } = useProductList();
  let [toastMessageList, setToastMessageList] = useState([]);

  return (
    <div className="main-page">
      {productList.length > 0 ? <Filters /> : null}
      <div className="products">
        {productList.length > 0 ? (
          productList.map((item, i) => (
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
                    <div className="product__card__price">Rs.{item.price}</div>
                    <div className="product__card_platform">
                      {item.platform === 1
                        ? "PlayStation 5"
                        : item.platform === 2
                        ? "Xbox Series X"
                        : null}
                    </div>
                    <div className="product__card__rating">{item.rating}★</div>
                    <div className="product__card__tags">
                      {item.newRelease ? (
                        <div className="card__tag tag__new__release">New</div>
                      ) : null}
                      {item.trending ? (
                        <div className="card__tag tag__trending">Trending</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : loading ? (
          <div className="loader">
            <Loader type="TailSpin" color="#543de0" height={50} width={50} />
          </div>
        ) : (
          "No Products available"
        )}
      </div>
      <Toast
        toastMessageList={toastMessageList ? toastMessageList : null}
        setToastMessageList={setToastMessageList}
      />
    </div>
  );
};

export { ProductsPage };
