import {formatMoney} from '../../utils/money';
import dayjs from 'dayjs';
import axios from 'axios';
export function DeliveryOptions({deliveryOptions, cartItem,loadCart}) {
  return (
     <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>

                {deliveryOptions.map((deliveryOption) => {
                  let priceShipping = 'FREE Shipping';
                  if (deliveryOption.priceCents >0) {
                    priceShipping = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                  }
                  const updateDeliveryOption = async () => {
                    await axios.put(`http://localhost:3000/api/cart-items/${cartItem.productId}`, {
                      deliveryOptionId: deliveryOption.id
                    })
                    await loadCart()
                  }
                  return (
                    <div onClick ={updateDeliveryOption}
                    key={deliveryOption.id} className="delivery-option">
                  <input type="radio" checked ={deliveryOption.id === cartItem.deliveryOptionId} onChange = {() => {

                  }}
                    className="delivery-option-input"
                    name= {`delivery-option-${cartItem.productId}`} />
                  <div>
                    <div className="delivery-option-date">
                      {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}
                    </div>
                    <div className="delivery-option-price">
                      {priceShipping}
                    </div>
                  </div>
                </div>
                  )
                })}
                
              </div>
  )
}