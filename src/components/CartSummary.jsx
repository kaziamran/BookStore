import React from 'react'
import { useCart } from '../context/CartContext'

const CartSummary = () => {
    const {state} = useCart();
    const {cartItems} = state;

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const discount = subTotal * 0.2;
    const deliveryFee = 15;
    const total = subTotal - discount + deliveryFee

  return (
    <div>
        <div>
            <h1>Order summary</h1>
        </div>
        <div>
          <div>
            <p>Sub Total</p>
            <p>{subTotal}</p>
          </div>
          <div>
            <p>Total Item</p>
            <p>{totalItems}</p>
          </div>
          <div>
            <p>Discount (-20%)</p>
            <p>${discount}</p>
          </div>
          <div>
            <p>Delivery Fee</p>
            <p>${deliveryFee}</p>
          </div>
        </div>
        <div>
          <p>Total</p>
          <p>${total}</p>
        </div>

        {/* <Button>Go to Checkout</Button> */}
    </div>
  )
}

export default CartSummary