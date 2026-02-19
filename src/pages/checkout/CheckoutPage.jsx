import {useState, useEffect} from 'react';
import axios from 'axios';
import {OrderSummary} from './OrderSummary';
import './CheckoutPage.css';
import {CheckoutHeader} from './CheckoutHeader';
import {PaymentSummary} from './PaymentSummary';
export function CheckoutPage({cart, loadCart}){
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);
  useEffect(() =>{
  const getDeliveryData = async () => {
   const response = await axios('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime');
   setDeliveryOptions(response.data)
  }
  getDeliveryData();
  }
  ,[]);

  useEffect(() => {
    const getPaymentData = async () => {
   const response = await axios('http://localhost:3000/api/payment-summary');
  setPaymentSummary(response.data)
  }
  getPaymentData();
  },[cart])
  return (
  <>
   <title>checkout</title>
  
   <CheckoutHeader cart = {cart}/>
   <link rel="icon" href="cart-favicon.png"></link>
    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
           
           <OrderSummary  deliveryOptions = {deliveryOptions} cart = {cart} loadCart = {loadCart}/>
           <PaymentSummary paymentSummary ={paymentSummary} loadCart ={loadCart}/>
      </div>
    </div>
  </>
  );
}