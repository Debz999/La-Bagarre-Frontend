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

  console.log('liste commandes', listOrder)

  //visible elements
  let orderContents =
    !listOrder || listOrder.length === 0 ? (
      <p>Rien à afficher</p>
    ) : (
      listOrder.map((order, index) => <OneOrder key={index} order={order} />)
    );

  return (
    <div>
      <h1>Vos commandes</h1>
      {orderContents}
    </div>
  );
}

export default Orders;
