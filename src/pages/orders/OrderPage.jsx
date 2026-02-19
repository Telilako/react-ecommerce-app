
import {Header} from '../../components/Header';
import './OrderPage.css';
import {useState, useEffect,Fragment} from 'react';
import axios from 'axios';
import {OrdersGrid} from './OrdersGrid';
export function OrderPage({cart, loadCart}) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
  const getOrdersData = async () => {
    const response = await axios('https://react-ecommerce-backend-update.onrender.com/api/orders?expand=products');
  setOrders(response.data);
  }
  getOrdersData();
  },[])
  return (
    <>
      <title>orders</title>
      
      <Header cart ={cart}/>
      <link rel="icon" href="orders-favicon.png"></link>
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
         <OrdersGrid orders = {orders}  loadCart = {loadCart}/>
      </div>
    </>
  )
}