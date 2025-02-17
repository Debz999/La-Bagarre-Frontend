import styles from "../styles/Cart.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneOrder from "./OneOrder";
//import { toggleOrders } from "../reducers/order"; //to be created

function Orders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [isPaid, setIsPaid] = useState(false);

  // GET EXISTING ORDER ITEMS
  const allPreviousOrders = () => {
    if (user.token) {
      fetch(`http://localhost:3000/orders/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          //dispatch(toggleOrders(data.data.items));
          console.log(data);
        });
    } else {
      console.log("need to log in");
    }
  };

  useEffect(() => {
    allPreviousOrders();
  }, []);



  //visible elements
  let orderContents = <p>Vous n'avez pas encore passé de commande</p>;
  //NEED TO DO A MAP HERE TO SEND PROPS TO OneOrder
  

  return (
    <div>
      <h1>Vos commandes</h1>
      {orderContents}
    </div>
  );
}

export default Orders;
