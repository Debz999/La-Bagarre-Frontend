import styles from "../styles/CartItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleCart, removeFromTemporaryCart, changeQuantityTemporaryCart } from "../reducers/cart";
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
    fetch(`https://la-bagarre-backend.vercel.app/carts/post/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: props.article._id, quantity: newQuantity }),
    })
      .then((response) => response.json())
      .then(() => {
        //insert get here
        fetch(`https://la-bagarre-backend.vercel.app/carts/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(toggleCart(data.data.items));
          });
      });
  };

  const deleteFromDatabase = () => {
    fetch(`https://la-bagarre-backend.vercel.app/carts/${user.token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: props.article._id }),
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`https://la-bagarre-backend.vercel.app/carts/${user.token}`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(toggleCart(data.data.items));
          });
      });
  };

  //console.log(props)
  const add = () => {
    //console.log(props.quantity);
    if(user.token) {
      updateDatabaseQuantity(props.quantity + 1);
    } else {
      dispatch(changeQuantityTemporaryCart({model: props.article.model, quantity: props.quantity + 1}))
    }
  };

  const minus = () => {
    if(user.token) {
      updateDatabaseQuantity(props.quantity - 1);
    } else {
      dispatch(changeQuantityTemporaryCart({model: props.article.model, quantity: props.quantity - 1}))
    }
  };

  const handleDelete = () => {
    if(user.token) {
      deleteFromDatabase();
    } else {
      dispatch(removeFromTemporaryCart(props))
    }
  };

  //console.log(cart.temporaryCart)
  //console.log('props', props.article.model)


  return (
    <div className={styles.card}>
      <div key={props._id} className={styles.cartItem}>
        <Image src={props.article.photos9[0]} width={200} height={225} />
        <div className={styles.itemDescription}>
          {/* <h3>{props.article.type}</h3> */}
          <h3 className={styles.itemTitle}>{props.article.model}</h3>
          <p>Taille: {props.size}</p>
          <p>Couleur: {props.color}</p>
          {/* <p>Prix: {props.article.price}€</p> */}

          <p className={styles.articlePrice}>
          {props.article.onSale ? (
            <>
              <span className={styles.barre}>{props.article.price}€</span>
              <br/>
              <span className={styles.onSalePrice}>{props.article.onSalePrice}€</span>
            </>
          ) : (
            <span className={styles.normalPrice}>{props.article.price}€</span>
          )}
        </p>

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
