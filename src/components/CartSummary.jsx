import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const DISCOUNT_RATE = 0.2; // 20%
const DELIVERY_FEE = 15;

const money = (n) => `$${n.toFixed(2)}`;

const CartSummary = () => {
  const { state } = useCart();
  const { cartItems } = state;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = subTotal * DISCOUNT_RATE;
  const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const total = subTotal - discount + deliveryFee;

  const rowClass = 'flex items-center justify-between text-base text-gray-600';

  const navigate = useNavigate();

  return (
    <aside
      aria-label="Order summary"
      className="rounded-md border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md sm:p-6 lg:sticky lg:top-6"
    >
      <h2 className="border-b border-gray-200 pb-4 text-xl font-medium text-[#333] sm:text-2xl">
        Order summary
      </h2>

      {/* Price rows */}
      <dl className="mt-5 flex flex-col gap-4 border-b border-gray-200 pb-5">
        <div className={rowClass}>
          <dt>Sub Total</dt>
          <dd className="font-medium text-[#333]">{money(subTotal)}</dd>
        </div>
        <div className={rowClass}>
          <dt>Total Items</dt>
          <dd className="font-medium text-[#333]">{totalItems}</dd>
        </div>
        <div className={rowClass}>
          <dt>Discount (-{DISCOUNT_RATE * 100}%)</dt>
          <dd className="font-medium text-[#ee7b24]">-{money(discount)}</dd>
        </div>
        <div className={rowClass}>
          <dt>Delivery Fee</dt>
          <dd className="font-medium text-[#333]">{money(deliveryFee)}</dd>
        </div>
      </dl>

      {/* Total */}
      <div className="flex items-center justify-between py-5 text-xl text-[#333] sm:text-2xl">
        <p>Total</p>
        <p className="font-medium text-[#ee7b24]">{money(total)}</p>
      </div>

      <button
        type="button"
        disabled={cartItems.length === 0}
        onClick={()=> navigate('/checkout')}
        className="w-full rounded-sm bg-[#ee7b24] py-3 text-lg text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
      >
        Go to Checkout
      </button>
    </aside>
  );
};

export default CartSummary;