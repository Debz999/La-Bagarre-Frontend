import styles from "../styles/Validation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addOrder } from "../reducers/orders";
import { useRouter } from "next/router";
import { emptyCartItem } from "../reducers/cart";

function Validation() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  const [goToSignup, seGoToSignup] = useState(false);
  const [selectAddress, setSelectAddress] = useState("");
  const router = useRouter();

  const saveNewOrder = () => {
    if (user.token) {
      fetch(`https://la-bagarre-backend.vercel.app/orders/post/${user.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: user.address[selectAddress],
          token: user.token,
          article: cart.cartItem,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('checking order', data)
          dispatch(addOrder(data));
          dispatch(emptyCartItem());
          router.push("/orders");
        });
    } else {
      seGoToSignup(true);
    }
  };
//console.log(user.address[selectAddress]) //address works
  // const saveNewOrder = () => {
  //   if (user.token) {
  //     fetch(`http://localhost:3000/orders/post/${user.token}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         address: user.address[selectAddress],

  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('checking order', data)
  //         dispatch(addOrder(data));
  //         //router.push("/orders");
  //       });
  //   } else {
  // console.log("needs to signup");
  //   }
  // };

  const handleSelectAddress = (index) => {
    console.log(index);
    setSelectAddress(index);
  };

  const myAddresses = user.address.map((data, i) => {
    return (
      <div className={selectAddress === i ? styles.selected : styles.notSelected}
      // style={{ border : selectAddress === i ? "2.5px solid blue" : "none" }}
      onClick={() => handleSelectAddress(i)} key={i}>
        <p style={{fontWeight: "600", fontSize: "13px"}} >ADRESSE {i + 1}</p>
        <h3 style={{ fontWeight : selectAddress === i ? "600" : "400" }}>
          {data.number} {data.street} {data.city} {data.zipcode} {data.country}</h3>
      </div>
    );
  });

  return (
    <div className={styles.main} >
      <h2>Merci pour votre commande {user.username} </h2>
      <p>Veuillez vérifier les informations ci-dessous : </p>
      <div className={styles.selectionContainer}>
      {myAddresses}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          saveNewOrder();
        }}
      >
        {" "}
        VALIDER MA COMMANDE
      </button>
    </div>
  );
}

export default Validation;
