import dayjs from 'dayjs';
import {CartItemDetails} from './CartItemDetails';
import {DeliveryOptions} from './DeliveryOptions';
import {DeliveryDate} from './DeliveryDate';
export function OrderSummary({deliveryOptions,cart, loadCart = {loadCart}}) {
  return (
     <div className="order-summary">
          { deliveryOptions.length >0 && cart.map((cartItem)=> {
             const selectedDeliveryOption = DeliveryDate({deliveryOptions,cartItem});
           return (
            <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              { `Delivery Date:  ${dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM d')}`}
            </div>

            <div className="cart-item-details-grid">
               <CartItemDetails  cartItem = {cartItem} loadCart = {loadCart}/>

               <DeliveryOptions deliveryOptions ={deliveryOptions} cartItem = {cartItem} loadCart = {loadCart} />
            </div>
          </div>
           )
          })}
          
        </div>
  )
}