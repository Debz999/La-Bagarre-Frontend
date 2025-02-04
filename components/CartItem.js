import styles from '../styles/Cart.module.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartItem() {

//{<span><FontAwesomeIcon icon={faTrash} onClick={() => handleDelete()} style={IconStyle} /></span>}

  return (
    <div className={styles.card}>
      <img className={styles.image} />
      <div className={styles.textContainer}>
        <div>
          <span className={styles.name}>article name here</span>
          <p className={styles.description}>description here</p>
          <p className={styles.description}>quantity here</p>
        </div>
        <div className={styles.iconContainer}>
          <span>icon here</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
