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
      <div className='mx-auto max-w-1400px px-6 py-12 lg:px-16 lg:py-10 text-center'> 
        <h1 className='text-2xl font-medium capitalize text-[#333] pb-2'>Your Cart is empty</h1>
        <button 
         type='button'
         onClick={()=> navigate('/')}
         className='mt-3 rounded bg-[#ee7b24] w-34 p-3 cursor-pointer font-medium text-base text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0'
        >
          Go to Home
        </button>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-1400px px-6 py-12 lg:px-16 lg:py-9'>
      <div className='pb-6'>
        <h1 className='text-xl font-medium capitalize text-[#333] sm:text-2xl lg:text-3xl'>My Cart</h1>
      </div>

      <div className='flex flex-col justify-between gap-4 lg:gap-10 md:flex-row'>
        <div className='flex items-start flex-col gap-4 w-full md:w-1/2'>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className='w-full md:w-1/2'>
          <CartSummary/>
        </div>
      </div>
    </div>
  )
}

export default MyCart