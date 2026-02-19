export function DeliveryDate({deliveryOptions, cartItem}) {
    return (
      deliveryOptions.find((deliveryOption) =>{
              return (
                deliveryOption.id === cartItem.deliveryOptionId
              )
            })
    )

}
