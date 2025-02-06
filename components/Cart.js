import styles from '../styles/Cart.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import {addItem, removeItem} from '../reducers/cart'

function Cart() {
const dispatch = useDispatch();
const [cartData, setCartData] = useState([]);

// GET EXISTING CART ITEMS
//  !!do another that only finds user's cart
useEffect(() => {
    fetch(`http://localhost:3000/carts/:${}`)
      .then(response => response.json())
      .then(data => {
        console.log('just D', data.data[0].items[0]); //it works!
        //console.log('quantity', data.data[0].items[0].quantity); //it works!
        setCartData( [...cartData, data.data[0]] ); // !!this zero will go when i change to get user's cart
        //dispatch(addItem(cartData))
        
      });
  }, []);
//console.log('cartData', cartData); 

const visibleCart = cartData.map((data, i) => {
  //console.log('check map', data.items[0].article)
return <CartItem key={i} {...data} />;
})



  return (
    <div>
      <h1>Mon Panier</h1>
      {visibleCart}
    </div>
  );
}

export default Cart;
