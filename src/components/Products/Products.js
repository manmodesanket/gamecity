import React, { useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { Filters } from "../Filters/Filters";
import { Toast } from "../Toast/Toast";
import Product from "../Product/Product";
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
              <Product item={item} />
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

export default ProductsPage;
