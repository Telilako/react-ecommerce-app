import {useState, useEffect} from 'react';
import axios from 'axios';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/orders/OrderPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { PageNotFound } from './pages/page_not_found/PageNotFound';
import './App.css'
import { Routes, Route } from 'react-router';
function App() {
  const loadCart = async () => {
    const response =  await axios('http://localhost:3000/api/cart-items?expand=product');
       setCart(response.data)
    }
   const [cart, setCart] =useState([]);
   useEffect(() => {
    
    loadCart();
  }
   ,[]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} loadCart ={loadCart}/>}></Route>
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart = {loadCart} />}></Route>
        <Route path="orders" element={<OrderPage cart={cart}  loadCart = {loadCart}/>}></Route>
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />}></Route>
        <Route path="*" element={<PageNotFound cart = {cart} />} />
      </Routes>
    </>
  )
}

export default App
