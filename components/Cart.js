import styles from "../styles/Cart.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { toggleCart } from "../reducers/cart";
import Link from "next/link";
import { useRouter } from "next/router";
import { addOrder } from "../reducers/orders";

function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value); //for token ! missing still
  const cart = useSelector((state) => state.cart.value);

  const [goToSignup, seGoToSignup] = useState(false);
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
  console.log('cartmodel',cart)
  const saveNewOrder = () => {
    if (user.token) {
      fetch(`http://localhost:3000/orders/post/${user.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adresse: user.adresse,
          token: user.token,
          article: cart.cartItem,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(addOrder(data));
          router.push("/validation");
        });
    } else {
      seGoToSignup(true);
    }
  }

  const handleGoToPayment = () => {
    
    if(!user.token) {
      seGoToSignup(true);
    } else if (user.token && user.address.length === 0) {
      router.push("/profil")
    } else if (user.token && user.address.length > 0) {
      //console.log(user.address)
      router.push('/validation')
    }
  }
  //console.log(cart.temporaryCart)

  //visible elements
  let cartContents = <p>Votre panier est vide</p>;
  //console.log("length", cart.cartItem);
  if (cart.temporaryCart.length > 0) {
    cartContents = cart.temporaryCart.map((data, i) => {
      return (
        <div>
          <CartItem key={i} {...data} />
        </div>
      );
    });
  }

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

  const totalItems = (
    cart.cartItem.length > 0 ? cart.cartItem : cart.temporaryCart
  ).reduce((sum, value) => sum + value.quantity, 0);

  // const totalOwed = cart.cartItem.reduce(
  //   (sum, value) => sum + value.article.price * value.quantity,
  //   0
  // );
  const totalOwed = (
    cart.cartItem.length > 0 ? cart.cartItem : cart.temporaryCart
  ).reduce((sum, value) =>
      sum + (value.article.onSale ? value.article.onSalePrice : value.article.price) * value.quantity, 0);

  let SignupModule = (
    <div>
      <p>
        Voulez-vous vous connecter pour continuer avec votre commande ?
      </p>
      <button className={styles.button2} onClick={() => router.push("/user")}>
        Oui ! Je me connecte
      </button>
      <button className={styles.button3} onClick={() => seGoToSignup(false)}>
        Continuer mes achats
      </button>
    </div>
  );

  return (
    <div>
      <div className={styles.outerContainer}>
        <div className={styles.column1}>
          <h1 className={styles.subtitle}>MON PANIER</h1>
          {cartContents}
        </div>

        <div className={styles.column2}>
          <h1 className={styles.subtitle}>RECAPITULATIF</h1>

          <p>Quantité d'articles dans votre panier : {totalItems}</p>
          <p>Montant à payer : {totalOwed}€</p>
          <button
            className={styles.button}
            onClick={() => handleGoToPayment()}
          >
            {" "}
            PROCÉDER AU PAIEMENT
          </button>
        </div>
      </div>
      {goToSignup && SignupModule}
    </div>
  );
}

export default Cart;
