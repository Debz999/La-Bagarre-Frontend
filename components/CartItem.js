import styles from "../styles/CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleCart } from "../reducers/cart";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function CartItem(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const user = useSelector((state) => state.user.value);
  //console.log(user.token); //this should work, just need to connect Cart and CartItem to the rest of the website.

  //WHEN I UPDATE DATABASEQUANTITY IT ALSO DELETS SIZES..... WHY ?? ----------------
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

  // const totalItems = cart.cartItem.reduce(
  //   (sum, value) => sum + value.quantity,
  //   0
  // );

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
        <Image src={props.article.photos9[0]} width={200} height={225} />
        <div className={styles.itemDescription}>
          {/* <h3>{props.article.type}</h3> */}
          <h3 className={styles.itemTitle}>{props.article.model}</h3>
          <p>Taille: {props.size}</p>
          <p>Couleur: {props.color}</p>
          <p>Prix: {props.article.price}€</p>
          <div className={styles.buttonsContainer}>
            <div className={styles.quantityControls}>
              <button onClick={() => minus()} className={styles.quantityButton}>
                -
              </button>
              <span>{props.quantity}</span>
              <button onClick={() => add()} className={styles.quantityButton}>
                +
              </button>
            </div>
            <FontAwesomeIcon
              className={styles.iconStyle}
              icon={faTrash}
              onClick={() => handleDelete()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
