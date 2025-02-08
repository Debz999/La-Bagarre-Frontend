import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleCart } from "../reducers/cart";
import Image from "next/image";

function CartItem(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  //const [article, setArticle] = useState('');
  const [quantity, setQuantity] = useState(1);

  const updateDatabaseQuantity = () => {
    fetch(`http://localhost:3000/carts/post/g4gzTD_5yd0mNev6BzG4jd4WXLuSNMCE`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: props.article._id, quantity: quantity }),
    })
      .then((response) => response.json())
      .then(() => {
        //insert get here
        fetch(`http://localhost:3000/carts/g4gzTD_5yd0mNev6BzG4jd4WXLuSNMCE`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(toggleCart(data.data.items));
          });
      });
  };

  const deleteFromDatabase = () => {
    fetch(`http://localhost:3000/carts/g4gzTD_5yd0mNev6BzG4jd4WXLuSNMCE`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: props.article._id }),
    })
      .then((response) => response.json())
      .then(() => {
        fetch(`http://localhost:3000/carts/g4gzTD_5yd0mNev6BzG4jd4WXLuSNMCE`)
          .then((response) => response.json())
          .then((data) => {
            dispatch(toggleCart(data.data.items)); 
          });
      });
  };
 
  const add = () => {
    setQuantity(quantity + 1);
    updateDatabaseQuantity();
  };

  const minus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    updateDatabaseQuantity();
  };

  const handleDelete = () => {
    deleteFromDatabase();
  };

  return (
    <div className={styles.card}>
      <div key={props._id} className={styles.cartItem}>
        <Image src="/img.png" width={200} height={225} />
        <div className={styles.itemDescription}>
          <h3>{props.article.type}</h3>
          <p>{props.article.model}</p>
          <p>size not included yet</p>
          <div className={styles.quantityControls}>
            <button onClick={() => minus()} className={styles.icon}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => add()} className={styles.icon}>
              +
            </button>
          </div>
        </div>
        <button onClick={() => handleDelete()}> X</button>
      </div>
    </div>
  );
}

export default CartItem;
