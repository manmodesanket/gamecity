import React from "react";
import {
  ProductContext,
  useProductList,
} from "../../context/ProductContext/ProductContext";
import Product from "../Product/Product";
import Loader from "react-loader-spinner";

const NewRelease = () => {
  const { productList, loading } = useProductList();
  return (
    <section className="newrelease">
      <h1 className="newrelease__heading">New Release</h1>
      <div className="products">
        {productList.length > 0 ? (
          productList.map((item, i) => {
            if (item.newRelease === true) {
              return (
                <div key={i} className="product__wrapper">
                  <Product item={item} />
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
    </section>
  );
};

export { NewRelease };
