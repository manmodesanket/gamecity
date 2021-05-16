import React, { useState, useEffect } from "react";
import { useCartList } from "../../context/CartContext/CartContext";
import { useProductList } from "../../context/ProductContext/ProductContext";

const Cart = () => {
  let { cartList } = useCartList();
  const { productList } = useProductList();
  let [itemList, setItemList] = useState([]);
  let [total, setTotal] = useState(0);

  const compare = (a, b) => {
    if (a.added > b.added) return 1;
    else return -1;
  };

  useEffect(() => {
    let list = [];
    for (let i = 0; i < cartList.length; i++) {
      for (let j = 0; j < productList.length; j++) {
        if (productList[j]._id === cartList[i].id) {
          const obj = {
            items: 1,
            added: cartList[i].added,
            ...productList[j],
          };
          list.push(obj);
        }
      }
    }
    setItemList(list);
  }, [cartList]);

  useEffect(() => {
    if (itemList.length > 0) {
      let total = 0;

      for (let i = 0; i < itemList.length; i++) {
        total += itemList[i].items * itemList[i].price;
      }
      setTotal(total);
    }
  }, [itemList]);

  const handleQuantity = (id, str) => {
    const product = itemList.find((item) => item._id === id);
    const newItemList = itemList.filter((item) => item._id !== id);
    if (str === "INC") {
      product.items += 1;
      const list = [product, ...newItemList];
      list.sort(compare);
      setItemList(list);
    } else if (str === "DESC") {
      if (product.items > 1) {
        product.items -= 1;
        const list = [product, ...newItemList];
        list.sort(compare);
        setItemList(list);
      }
    }
  };

  return (
    <div className="main-page main-page__cart">
      <h1>Cart</h1>
      <h2>Total: Rs.{total ? total : 0}</h2>
      <div className="cart__products">
        {itemList
          ? itemList.map((item, i) => (
              <div key={item._id} className="cart_card__wrapper">
                <div key={i} className="cart__card">
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
                      Rs.{item.price * item.items}
                    </div>
                  </div>
                </div>
                <div className="product_quantity">
                  <button onClick={() => handleQuantity(item._id, "DESC")}>
                    -
                  </button>
                  {item.items}
                  <button onClick={() => handleQuantity(item._id, "INC")}>
                    +
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export { Cart };
