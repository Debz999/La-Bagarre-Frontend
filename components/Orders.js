import styles from "../styles/Orders.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneOrder from "./OneOrder";
import { addOrder } from "../reducers/orders";

function Orders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // const [isPaid, setIsPaid] = useState(false);
  const [listOrder, setListOrder] = useState([]);

  // GET EXISTING ORDER ITEMS
  const allPreviousOrders = () => {
    if (user.token) {
      fetch(`http://localhost:3000/orders/${user.token}`)
        .then((response) => response.json())

        .then((data) => {
          // console.log("données api", data.data);
          dispatch(addOrder(data.data));
          setListOrder(data.data);
        });
    } else {
      console.log("need to log in");
    }
  };

  useEffect(() => {
    allPreviousOrders();
  }, [user.token]);

  //visible elements
  let orderContents =
    !Array.isArray(listOrder) || listOrder.length === 0 ? (
      <p>Rien à afficher</p>
    ) : (
      listOrder.map((order, index) => {
        console.log(order);
        if (!order || !order.items || order.items.length === 0) {
          console.error("Commande invalide ou vide:", index);
          return null;
        }

        

        return (
          <div key={index}>
            <h2>Commande du {new Date(order.date).toLocaleDateString()}</h2>
            <p>Statut : {order.delivery}</p>
            <p>
              Adresse :{order.address.number} {order.address.street} {order.address.city} {order.address.zipcode} {order.address.country}
            </p>
            {order.items.map((item, itemIndex) => (
              <OneOrder key={itemIndex} item={item} />
            ))}
          </div>
        );
      })
    );

  return (
    <div className={styles.containerDeTout}>
      <h1>Vos commandes</h1>
      {orderContents}
    </div>
  );
}

export default Orders;
