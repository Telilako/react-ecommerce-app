import './TrackingPage.css';
import {Link} from 'react-router';
import {useParams} from 'react-router'
import {useState, useEffect, Fragment} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import {Header} from '../../components/Header';

export function TrackingPage({cart}){
  const params = useParams();
  const {orderId, productId} = params;
  const [orders, setOrders] = useState([]);
    useEffect(() => {
      const getTrackOrderData = async() => {
        const response = await axios(`https://react-ecommerce-backend-update.onrender.com/api/orders/${orderId}?expand=products`);
        setOrders([response.data]);

      }
      getTrackOrderData();
    },[orderId])
  return (
    <>
    <Header cart = {cart}/>
     
    <link rel ="icon" href="tracking-favicon.png"></link>
    
    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" href="/orders">
          View all orders
        </Link>

       {orders.map((order) => {
        const orderTracks= order.products.find((orderTrack) => {
         return (
          orderTrack.productId === productId
         )
        }) 
        const totalDeliveryTimeMs = orderTracks.estimatedDeliveryTimeMs - order.orderTimeMs;
        const timePassedMs = totalDeliveryTimeMs*.45;
        let  progress = (timePassedMs/totalDeliveryTimeMs)*100;
  
        if (progress >100) {
          progress =100;
        }
        const isPreparing = progress < 33;
const isShipped = progress>= 33 && progress< 100;
const isDelivered = progress === 100;
        return (
                   <Fragment key = {order.id}>
             <div className="delivery-date">
         {progress >=100 ? "Delivered on" : `Arriving on ${dayjs(orderTracks.estimatedDeliveryTimeMs).format('dddd,  MMMM  D' )}`}
        </div>

        <div className="product-info">
          {orderTracks.product.name}
        </div>

        <div className="product-info">
          Quantity: {orderTracks.quantity}
        </div>

        <img className="product-image" src= {orderTracks.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing && 'current-status'}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && 'current-status'}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && 'current-status'}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style= {{width: `${progress}%`}}></div>
        </div>
          </Fragment>
        )
       })}
      </div>
    </div>
    </>
  )
}