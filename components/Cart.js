import styles from '../styles/Cart.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import {toggleCart} from '../reducers/cart'

function Cart() {
const dispatch = useDispatch();
const user = useSelector((state) => state.cart.value); //for token ! missing still
const cart = useSelector((state) => state.cart.value);
//console.log(user.token); it works, just need to link the cart to the rest


//TO BE INSERTED IN ARTICLE PAGE !! 
//post new cart item
//maybe add flexible quantity later, depending on the article Item: const [quantity, setQuantity] = useState(1);
const addItemToCart = () => {
  fetch(`http://localhost:3000/carts/post/${user.token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: props.article._id, quantity: 1 }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(toggleCart(data.data.items));
      // //not sure i need this get here.
      // fetch(`http://localhost:3000/carts/g4gzTD_5yd0mNev6BzG4jd4WXLuSNMCE`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //   });
    });
};


// GET EXISTING CART ITEMS
useEffect(() => {
    fetch(`http://localhost:3000/carts/${user.token}`)
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
