import styles from "../styles/OneOrder.module.css";
import { useSelector } from "react-redux";

function OneOrder(props) {
  const order= props.order

  return (
    <div className={styles.card}>
      <p>Article : {order.article}</p>
      <p> Prix : {order.price} </p>
      <p>Quantité : {order.quantity}</p>
     
    </div>
  );
}

export default OneOrder;
