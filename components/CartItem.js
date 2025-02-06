import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addQuantity, minusQuantity, removeItem } from "../reducers/cart";
import Image from "next/image";

function CartItem(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  //console.log("Redux State:", useSelector((state) => state.cart));

  const add = () => {
    dispatch(addQuantity());
  };
  const minus = () => {
    dispatch(minusQuantity());
  };
  const handleDelete = () => {
    dispatch(removeItem());
    //add delete route here
  };

  const articleData = props.items;
  const articleMap = articleData.map((data, i) => {
    //console.log(data.article.model); //it works!
    return (
      <div key={i} className={styles.cartItem}>
        <Image src="/img.png" width={200} height={250} />
        <div className={styles.itemDescription}>
          <h3>{data.article.type}</h3>
          <p>{data.article.model}</p>
          <p>size here</p>
          <div className={styles.quantityControls}>
            <button onClick={() => minus()} className={styles.icon}>
              -
            </button>
            <span>{cart.quantity}</span>
            <button onClick={() => add()} className={styles.icon}>
              +
            </button>
          </div>
        </div>
        <button onClick={() => handleDelete()}> X</button>
      </div>
    );
  });

  return (
    <div className={styles.card}>
      {articleMap}
    </div>
  );
}

export default CartItem;
