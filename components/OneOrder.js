import styles from "../styles/Cart.module.css";
import { useSelector } from "react-redux";

function OrderOne(props) {
  const cart = useSelector((state) => state.cart.value);
  const user = useSelector((state) => state.user.value);

  /*
  STEPS
  if user logged, i can retrieve past orders. 
just place the strucrure of each order, will send data via props
nothing else here  */

  return (
    <div className={styles.card}>
      <p>Article name</p>
      <p>Quantity</p>
      <p>Total paid per article</p>
    </div>
  );
}

export default OrderOne;
