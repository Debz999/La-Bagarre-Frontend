import styles from '../styles/Cart.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import {toggleCart} from '../reducers/cart'

function Cart() {
const dispatch = useDispatch();
const user = useSelector((state) => state.cart.value); //for token ! missing still
const cart = useSelector((state) => state.cart.value);



// GET EXISTING CART ITEMS
useEffect(() => {
    fetch(`http://localhost:3000/carts/g4gzTD_5yd0mNev6BzG4jd4WXLuSNMCE`)
      .then(response => response.json())
      .then(data => {
        dispatch(toggleCart(data.data.items))
        
      });
    }, []);
//console.log('test cart', cart)

//visible elements
let cartVisibility = <p>There are no items in your cart yet</p>;
if(cart.length !== 0) {
  cartVisibility = cart.cartItem.map((data, i) => {
    //console.log('check map', data)
  return <CartItem key={i} {...data} />;
  })
}




  return (
    <div>
      <h1>My Cart</h1>
      {cartVisibility}
    </div>
  );
}

export default Cart;
