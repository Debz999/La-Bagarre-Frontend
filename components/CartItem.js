import styles from "../styles/CartItem.module.css";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartItem() {

  return (
    <div className={styles.card}>
      <img className={styles.image} src={props.poster} alt={props.name} />
      <div className={styles.textContainer}>
        <div>
          <span className={styles.name}>{props.name}</span>
          <p className={styles.description}>{props.overview}</p>
        </div>
        <div className={styles.iconContainer}>
          <span className={styles.vote}>{stars} ({props.voteCount})</span>
          <span>{personalStars} ({personalNote})</span>
          <span><FontAwesomeIcon icon={faTrash} onClick={() => handleDelete()} style={IconStyle} /></span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
