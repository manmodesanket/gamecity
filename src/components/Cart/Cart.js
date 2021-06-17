import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useCartList } from "../../context/CartContext/CartContext";
import { useProductList } from "../../context/ProductContext/ProductContext";
import {
  createToastMessageList,
  findProductById,
} from "../../Utilities/UtilityFunctions";
import { Toast } from "../Toast/Toast";
import axios from "axios";
import { navigate } from "@reach/router";
import makeApiCall from "../../server/server.request";

const Cart = () => {
  let { cartList, cartDispatch } = useCartList();

  let { token, user, setUser } = useAuth();
  const { productList } = useProductList();
  let [itemList, setItemList] = useState([]);
  let [itemList1, setItemList1] = useState([]);
  let [total, setTotal] = useState(0);
  let [toastMessageList, setToastMessageList] = useState([]);

  const compare = (a, b) => {
    if (a.added > b.added) return 1;
    else return -1;
  };

  useEffect(() => {
    (async function () {
      try {
        if (token != null) {
          let urlStr = process.env.REACT_APP_API_ROOT_URL + "auth/user";
          let data = { headers: { authorization: token } };
          const { success, response } = await makeApiCall({
            type: "get",
            url: urlStr,
            data,
          });
          if (success) {
            setUser(response.userID);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user, token]);

  useEffect(async () => {
    let list = [];
    if (cartList != null) {
      cartList.forEach(async (item) => {
        let urlStr = process.env.REACT_APP_API_ROOT_URL + "products/" + item.id;
        const { success, response } = await makeApiCall({
          type: "get",
          url: urlStr,
        });
        if (success === true && response != null) {
          list.push(response.product);
        }
      });
    }
    setItemList1(list);
  }, [cartList]);

  useEffect(() => {
    let list = [];
    for (let i = 0; i < cartList.length; i++) {
      const obj = findProductById(productList, cartList[i].id);
      if (obj !== null) {
        obj = {
          quantity: cartList[i].quantity,
          ...obj,
        };
        list.push(obj);
      }
    }
    setItemList(list);
  }, [cartList]);

  useEffect(() => {
    if (itemList.length > 0) {
      let total = 0;

      for (let i = 0; i < itemList.length; i++) {
        total += itemList[i].quantity * itemList[i].price;
      }
      setTotal(total);
    } else if (itemList.length === 0) {
      setTotal(0);
    }
  }, [itemList]);

  const handleQuantity = async (id, str) => {
    let urlStr = process.env.REACT_APP_API_ROOT_URL + "cart";
    let data = {
      query: {
        username: user,
        cartItem: id,
        action: "update",
        actiontype: str,
      },
    };
    const item = itemList.find((item) => item._id === id);
    if (item.quantity > 1 && item.quantity < 6) {
      const { success, response } = await makeApiCall({
        type: "post",
        url: urlStr,
        data,
      });
      if (success === true) {
        cartDispatch({
          type: "CART_LIST",
          payload: response.savedCart.cartList,
        });
      }
    } else {
      const obj = createToastMessageList("Cannot perform action.");
      setToastMessageList([...toastMessageList, obj]);
    }
  };

  const handleCartRemove = async (id) => {
    let data = { query: { username: user, cartItem: id, action: "remove" } };
    let urlStr = process.env.REACT_APP_API_ROOT_URL + "cart";
    const { success } = await makeApiCall({
      url: urlStr,
      type: "post",
      data,
    });
    if (success) {
      cartDispatch({
        type: "REMOVE_FROM_CART",
        payload: id,
      });
      const newItemList = itemList.filter((item) => item._id != id);
      setItemList(newItemList);
      const obj = createToastMessageList("Item removed from cart");
      setToastMessageList([...toastMessageList, obj]);
    } else {
      const obj = createToastMessageList("Failed to remove from Cart");
      setToastMessageList([...toastMessageList, obj]);
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
                    <div className="cart_card_details_wrapper">
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
                </div>
                <div className="cart__product__actions">
                  <div className="product_quantity">
                    <button
                      onClick={() => handleQuantity(item._id, "DESC")}
                      className="btn cart__card__quantity__btn product_quantity__element"
                    >
                      -
                    </button>
                    <div className="product_quantity__element">
                      {item.quantity}
                    </div>

                    <button
                      onClick={() => handleQuantity(item._id, "INC")}
                      className="btn cart__card__quantity__btn product_quantity__element"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleCartRemove(item._id)}
                    className="btn cart__product__actions__remove__btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Toast
        toastMessageList={toastMessageList}
        setToastMessageList={setToastMessageList}
      />
    </div>
  );
};

export { Cart };
