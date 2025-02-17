import styles from "../styles/Cart.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function payment() {
  const user = useSelector((state) => state.user.value);

  //CREATE ORDER, this is just the base, need to edit body: JSON.stringify to send info to DB, needs checking
  const createNewOrder = () => {
    if (user.token) {
      fetch(`http://localhost:3000/orders/post/${user.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ _id: props.article._id, quantity: newQuantity }),
      })
        .then((response) => response.json())
        .then(() => {
          //insert get here
          fetch(`http://localhost:3000/orders/${user.token}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
        });
    } else {
      console.log("need to log in");
    }
  };


  return (
    <div>
      <h1>Confirmation de la commande</h1>
      <button onClick={createNewOrder()}>Passer la commande - EN COURS</button>
    </div>
  );
}
export default payment;
