import styles from '../styles/Cart.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import {addItem, removeItem} from '../reducers/cart'

function Cart() {
// const cart = useSelector((state) => state.cart.value);
// const dispatch = useDispatch();
// const [cartData, setCartData] = useState([]);

//NEEDS CHECKING
//GET EXISTING CART ITEMS
// useEffect(() => {
//     fetch('http://localhost:3000/carts')
//       .then(response => response.json())
//       .then(data => {
//         setCartData( [...cartData, data] );
//         dispatch(addItem(cartData))
//       });
//   }, []);



  return (
<CartItem/>
  );
}

export default Cart;
