import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleCart } from "../reducers/cart";
import Image from "next/image";

function CartItem(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const user = useSelector((state) => state.user.value);
  //console.log(user.token); //this should work, just need to connect Cart and CartItem to the rest of the website.

  const updateDatabaseQuantity = (newQuantity) => {
    fetch(`http://localhost:3000/carts/post/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: props.article._id, quantity: newQuantity }),
    })
      .then((response) => response.json())
      .then(() => {
        //insert get here
        fetch(`http://localhost:3000/carts/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(toggleCart(data.data.items));
          });
      });
  };

  const deleteFromDatabase = () => {
    fetch(`http://localhost:3000/carts/${user.token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: props.article._id }),
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:3000/carts/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(toggleCart(data.data.items));
          });
      });
  };

  const totalItems = cart.cartItem.reduce(
    (sum, value) => sum + value.quantity,
    0
  );

  const add = () => {
    //console.log(props.quantity);
    updateDatabaseQuantity(props.quantity + 1);
  };

  const minus = () => {
    updateDatabaseQuantity(props.quantity - 1);
  };

  const handleDelete = () => {
    deleteFromDatabase();
  };

  return (
    <div className={styles.card}>
      <div key={props._id} className={styles.cartItem}>
        <Image src="/img.png" width={200} height={225} />
        <div className={styles.itemDescription}>
          <h3>{props.article.type}</h3>
          <p>{props.article.model}</p>
          <p>size not included yet</p>
          <div className={styles.quantityControls}>
            <button onClick={() => minus()} className={styles.icon}>
              -
            </button>
            <span>{totalItems}</span>
            <button onClick={() => add()} className={styles.icon}>
              +
            </button>
          </div>
        </div>
        <button onClick={() => handleDelete()}> X</button>
      </div>
    </div>
  );
}

export default CartItem;
