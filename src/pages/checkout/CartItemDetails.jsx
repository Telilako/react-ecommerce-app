import {formatMoney} from '../../utils/money';
import axios from 'axios';
import {useState} from 'react';
export function CartItemDetails({cartItem,loadCart}) {
 const [input ,setInput] = useState(false);
 const [quantity, setQuantity] = useState(cartItem.quantity);
 async function handleUpdate() {
  if (!input){
    setInput(true);
    return;
  }
  await axios.put(`https://react-ecommerce-backend-update.onrender.com/api/cart-items/${cartItem.productId}`, {quantity: Number(quantity)});
  await loadCart();
  setInput(false);
 }
  const deleteCartItem = async() => {
    await axios.delete(`https://react-ecommerce-backend-update.onrender.com/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }
  return (
    <>
     <img className="product-image"
                src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {cartItem.product.name}
                </div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    
                    Quantity: <span  className="quantity-label">  {cartItem.quantity}</span>
                    <input onKeyDown = {(event) =>{
                     if(event.key === 'Enter') {handleUpdate() }
                     if (event.key=== 'Escape'){setQuantity(cartItem.quantity)
                      setInput(false);
                     }
                    }}
                    
                    value ={quantity} onChange = {(event) => {
                       setQuantity(event.target.value);
                    }} type ="text" className="input-for-quantity" style ={{opacity: input?1:0}}/>
                  </span>
                  <span onClick = {handleUpdate}className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span onClick = {deleteCartItem}  className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
    </>
  )
}