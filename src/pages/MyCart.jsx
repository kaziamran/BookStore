import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'

const MyCart = () => {

  const navigate = useNavigate();
  const {state} = useCart();
  const {cartItems} = state;

  if(cartItems.length === 0) {
    return (
      <div className='mx-auto max-w-1400px px-6 py-12 lg:px-16 lg:py-6'> 
        <h1>Your Cart is empty</h1>
        <button onClick={()=> navigate('/')}>Go to Home</button>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-1400px px-6 py-12 lg:px-16 lg:py-6'>
      <div>
        <h1>Your Cart</h1>
      </div>

      <div>
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary/>
        </div>
      </div>
    </div>
  )
}

export default MyCart