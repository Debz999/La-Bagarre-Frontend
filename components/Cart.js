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
          if (data === true) {
            dispatch(toggleCart(data.data.items));
          }
        });
    } else {
      console.log("need to log in");
    }
  };

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
  };

  //visible elements
  let cartContents = <p>There are no items in your cart yet</p>;
  //console.log("length", cart.cartItem);
  if (cart.cartItem.length > 0) {
    cartContents = cart.cartItem.map((data, i) => {
      //console.log('check map', data)
      return (
        <div>
          <CartItem key={i} {...data} />
          <div style={styles.buttonContainer}>
            <button
              onClick={() => {
                saveNewOrder();
              }}
              style={styles.buttonContainer}
            >
              {" "}
              Procéder au paiement
            </button>
            <button
              onClick={() => {
                continueShopping();
              }}
              style={styles.buttonContainer}
            >
              {" "}
              Continuer mes achats
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>My Cart</h1>
      {cartContents}
    </div>
  );
}

export default Cart;
