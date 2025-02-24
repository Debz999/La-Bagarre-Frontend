import styles from "../styles/Cart.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { toggleCart } from "../reducers/cart";
import Link from "next/link";
import { useRouter } from "next/router";

function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); //for token ! missing still
  const cart = useSelector((state) => state.cart.value);
  // console.log(user.token); //it works, just need to link the cart to the rest
  // console.log("cartPage value", cart.cartItem);
  const router = useRouter();

  // GET EXISTING CART ITEMS add ${user.token}
  const getExistingCart = () => {
    if (user.token) {
      fetch(`http://localhost:3000/carts/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            dispatch(toggleCart(data.data.items));
          } else {
            console.log("no items");
          }
        });
    } else {
      console.log("need to log in");
    }
  };

  //console.log(cart)

  //old get existing cart items, test first but prob will delete
  useEffect(() => {
    getExistingCart();
  }, []);

  const continueShopping = () => {
    router.push("/");
  };

 
  const saveNewOrder = () => {
    if (user.token) {
      fetch(`http://localhost:3000/orders/post/${user.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adresse : user.adresse,
          token : user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //envoyer vers page de paiement?
          //enregistrer la commande dans orders sans possibilité de modifs
        });
    }
  }

  //visible elements
  let cartContents = <p>Votre panier est vide</p>;
  //console.log("length", cart.cartItem);
  if (cart.cartItem.length > 0) {
    cartContents = cart.cartItem.map((data, i) => {
      //console.log("check map", data); //THIS HAS ALL THE AVAILABLE COLORS AND SIZES
      //check if i can't use this map to make them always editable, not sure if its worth it, ask
      return (
        <div>
          <CartItem key={i} {...data} />
        </div>
      );
    });
  }

  const totalItems = cart.cartItem.reduce(
    (sum, value) => sum + value.quantity,
    0
  );

  const totalOwed = cart.cartItem.reduce(
    (sum, value) => sum + value.article.price * value.quantity,
    0
  );

  return (
    <div>
      <div className={styles.outerContainer}>
        <div className={styles.column1}>
          <h1 className={styles.subtitle} >MON PANIER</h1>
          {cartContents}
        </div>

        <div className={styles.column2}>
        <h1 className={styles.subtitle}>RECAPITULATIF</h1>

          <p>Quantité d'articles dans votre panier : {totalItems}</p>
          <p>Montant à payer : {totalOwed}€</p>
            <button className={styles.button}
              onClick={() => {
                saveNewOrder();
              }}
              
            >
              {" "}
              PROCÉDER AU PAIEMENT
            </button>

        </div>
      </div>
            <button
              onClick={() => {
                continueShopping();
              }}
              className={styles.buttonContainer}
            >
              {" "}
              Continuer mes achats
            </button>
    </div>
  );
}

export default Cart;
