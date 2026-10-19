import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const cancelRef = useRef(null);
  const titleId = useId();

  // While the modal is open: close on Escape, lock page scroll, focus "Cancel"
  useEffect(() => {
    if (!showModal) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    cancelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const confirmRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    setShowModal(false);
  };

  const iconBtn =
    'grid size-9 place-items-center text-[#333] transition hover:bg-[#ee7b24] hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ee7b24]';

  return (
    <div className='w-full'>
      <li className="flex gap-4 w-full rounded-md border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:gap-7">
        {/* Image */}
        <img
          src={item.image}
          alt={item.alt}
          className="h-28 w-20 shrink-0 rounded-sm bg-gray-100 object-cover sm:h-36 sm:w-32"
        />

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          <div>
            <h3 className="line-clamp-2 text-xl text-[#333]">{item.title}</h3>
            <p className="mt-1 text-base text-gray-600">
              Price: <span className="font-medium text-[#ee7b24]">${item.price}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Quantity controls */}
            <div className="inline-flex items-center overflow-hidden rounded-sm border border-gray-300">
              <button
                type="button"
                aria-label={`Decrease quantity of ${item.title}`}
                onClick={() => dispatch({ type: 'DECREMENT', payload: item.id })}
                className={iconBtn}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M5 11V13H19V11H5Z" />
                </svg>
              </button>

              <span className="min-w-10 px-2 text-center text-base text-[#333]" aria-live="polite">
                {item.quantity}
              </span>

              <button
                type="button"
                aria-label={`Increase quantity of ${item.title}`}
                onClick={() => dispatch({ type: 'INCREMENT', payload: item.id })}
                className={iconBtn}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                </svg>
              </button>
            </div>

            {/* Line total */}
            <p className="text-base text-gray-600">
              Total:{' '}
              <span className="font-medium text-[#333]">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* Remove: opens the modal */}
        <button
          type="button"
          aria-label={`Remove ${item.title} from cart`}
          onClick={() => setShowModal(true)}
          className="grid size-9 shrink-0 place-items-center self-start rounded-full text-[#ee7b24] transition hover:bg-[#ee7b24]/10 hover:text-[#d96a16] focus-visible:outline-2 focus-visible:outline-[#ee7b24]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
            <path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM9 4V6H15V4H9Z" />
          </svg>
        </button>
      </li>

      {/* Confirm modal (rendered into <body> so it always sits on top) */}
      {showModal &&
        createPortal(
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-100 grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(e) => e.stopPropagation()}
              className="animate-pop-in w-full max-w-sm rounded-md bg-white p-6 text-center shadow-xl"
            >
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#ee7b24]/10 text-[#ee7b24]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
                  <path d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM9 4V6H15V4H9Z" />
                </svg>
              </div>

              <h2 id={titleId} className="mt-4 text-xl font-medium text-[#333]">
                Remove this book?
              </h2>
              <p className="mt-2 text-base text-gray-600">
                <span className="text-[#333]">"{item.title}"</span> will be removed from your cart.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  ref={cancelRef}
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-sm border border-gray-300 py-2.5 text-base text-[#333] transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmRemove}
                  className="flex-1 rounded-sm bg-[#ee7b24] py-2.5 text-base text-white shadow-md shadow-black/20 transition hover:bg-[#d96a16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24]"
                >
                  Yes, remove
                </button>
              </div>
            </div>
          </div>,
          document.body
       )}
    </div>
  );
};

export default CartItem;