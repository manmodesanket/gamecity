import React, { useState, useEffect } from "react";
import { useCartList } from "../../context/CartContext/CartContext";
import { useProductList } from "../../context/ProductContext/ProductContext";

const Cart = () => {
  let { cartList } = useCartList();
  const { productList } = useProductList();
  let [itemList, setItemList] = useState([]);

  useEffect(() => {
    let list = [];
    for (let i = 0; i < cartList.length; i++) {
      for (let j = 0; j < productList.length; j++) {
        if (productList[j]._id === cartList[i]) {
          list.push(productList[j]);
        }
      }
    }
    setItemList(list);
  }, [cartList]);

  return (
    <div>
      <h1>Cart</h1>
      <div className="products">
        {itemList
          ? itemList.map((item, i) => (
              <div key={i} className="card">
                <div className="card-name">{item.name}</div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export { Cart };
