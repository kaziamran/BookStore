import React from 'react'

import { useCart } from "../context/CartContext"

const CartItem = ({item}) => {
    const {dispatch} = useCart()
 
    return (
     <div>
        <div>
            <img src={item.image} alt={item.alt} />
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=> dispatch({type: "REMOVE_FROM_CART", payload : item.id})} viewBox="0 0 24 24" width="24" height="24" fill="rgb(240 124 41)">
                    <path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM9 4V6H15V4H9Z"></path>
                </svg>
            </div>
            <div>
                <span>Title:</span>
                <span>{item.title}</span>
            </div>
            <div>
                <span>Price:</span>
                <span>${item.price}</span>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=> dispatch({type: "DECREMENT", payload : item.id})} viewBox="0 0 24 24" width="24" height="24" fill="rgb(240 124 41)">
                        <path d="M5 11V13H19V11H5Z"></path>
                    </svg>
                    <span>{item.quantity}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=> dispatch({type: "INCREMENT", payload : item.id})} viewBox="0 0 24 24" width="24" height="24" fill="rgb(240 124 41)">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                    </svg>
                </div>
            </div>
        </div>
     </div>
  )
}

export default CartItem