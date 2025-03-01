import styles from "../styles/OneOrder.module.css";
import { useSelector } from "react-redux";

function OneOrder(props) {
  const item= props.item

  return (
    <div className={styles.card}>
      <p>Article : {item.model} </p>
      <p>Taille : {item.size}</p>
      <p>Couleur : {item.color} </p>
      <p> Prix : {item.price} </p>
      <p>Quantité : {item.quantity}</p>
     
    </div>
  );
}

export default OneOrder;
