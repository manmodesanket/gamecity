import React, { useEffect, useState } from "react";
import { useProductList } from "../../context/ProductContext/ProductContext";
import { WishListButton } from "../WishListButton/WishListButton";
import { AddToCartButton } from "../Home/AddToCartButton";
import { Filters } from "../Filters/Filters";
import { Toast } from "../Toast/Toast";

const ProductsPage = () => {
  const { productList, loading } = useProductList();
  let [toastMessageList, setToastMessageList] = useState([]);

  return (
    <div>
      <h1>Home</h1>
      <Filters />
      <div className="products">
        {productList.length > 0
          ? productList.map((item, i) => (
              <div key={i} className="card">
                <div className="card-name">{item.name}</div>
                <div>
                  <WishListButton
                    id={item._id}
                    toastMessageList={toastMessageList}
                    setToastMessageList={setToastMessageList}
                  />
                </div>
                <div>
                  <AddToCartButton
                    id={item._id}
                    toastMessageList={toastMessageList}
                    setToastMessageList={setToastMessageList}
                  />
                </div>
                <div>Rs.{item.price}</div>
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
