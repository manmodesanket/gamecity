import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useCartList } from "../../context/CartContext/CartContext";
import { useProductList } from "../../context/ProductContext/ProductContext";
import {
  createToastMessageList,
  findProductById,
} from "../../Utilities/UtilityFunctions";
import { Toast } from "../Toast/Toast";
import makeApiCall from "../../server/server.request";
import CartItem from "./CartItem";
import empty from "../../../public/empty_cart.png";

const Cart = () => {
  let { cartList, cartDispatch } = useCartList();

  let { user } = useAuth();
  const { productList } = useProductList();
  let [itemList, setItemList] = useState([]);
  let [total, setTotal] = useState(0);
  let [toastMessageList, setToastMessageList] = useState([]);

  useEffect(() => {
    let list = [];
    for (let i = 0; i < cartList.length; i++) {
      const obj = findProductById(productList, cartList[i].id);
      if (obj !== null) {
        obj.quantity = cartList[i].quantity;
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
    if (
      (item.quantity > 1 && str === "DESC") ||
      (item.quantity < 6 && str === "INC")
    ) {
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
    <main className="main-page main-page__cart">
      <section>
        <h1>Cart</h1>
      </section>
      <section>
        {total ? (
          <span>Total: Rs. {total}</span>
        ) : (
          <div className="empty__cart">
            <p>Cart is empty.</p>
            <img src={empty} alt="Cart Empty" className="empty__cart__img" />
          </div>
        )}
      </section>

      <section className="cart__products">
        {itemList
          ? itemList.map((item) => (
              <CartItem
                item={item}
                handleQuantity={handleQuantity}
                handleCartRemove={handleCartRemove}
                toastMessageList={toastMessageList}
                setToastMessageList={setToastMessageList}
                key={item._id}
              />
            ))
          : null}
      </section>
      <Toast
        toastMessageList={toastMessageList}
        setToastMessageList={setToastMessageList}
      />
    </main>
  );
};

export default Cart;
