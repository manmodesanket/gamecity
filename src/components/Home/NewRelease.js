import React from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { Link } from "@reach/router";
import Loader from "react-loader-spinner";

const NewRelease = () => {
  const { productList, loading } = useProductList();
  return (
    <div className="newrelease">
      <h1 className="newrelease__heading">New Release</h1>
      <div className="products">
        {productList.length > 0 ? (
          productList.map((item, i) => {
            if (item.newRelease === true) {
              return (
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
                        <div className="product__card_platform">
                          {item.platform === 1
                            ? "PlayStation 5"
                            : item.platform === 2
                            ? "Xbox Series X"
                            : null}
                        </div>
                        <div className="product__card__rating">
                          {item.rating}★
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
          })
        ) : loading ? (
          <div className="loader">
            <Loader type="TailSpin" color="#543de0" height={50} width={50} />
          </div>
        ) : (
          "No Products available"
        )}
      </div>
    </div>
  );
};

export { NewRelease };
