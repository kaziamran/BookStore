import { useCallback, useEffect, useLayoutEffect, useRef, useState, useId } from 'react';
import { createPortal } from 'react-dom';
import { ITEMS } from '../assets/assets'
import { useCart } from '../context/CartContext';

const LEN = ITEMS.length;
const CLONES = 4; // copies at each end (>= the most cards visible at once)
const DURATION = 500; // slide animation (ms)
const AUTOPLAY_MS = 3000; // time between automatic slides
 
// [last 4 clones] + [8 real books] + [first 4 clones]
const ITEMS01 = [
  ...ITEMS.slice(-CLONES).map((b) => ({ ...b, clone: true })),
  ...ITEMS.map((b) => ({ ...b, clone: false })),
  ...ITEMS.slice(0, CLONES).map((b) => ({ ...b, clone: true })),
];

export default function FeaturedBooks() {
  const {dispatch} = useCart();

  const [showModal, setShowModal] = useState(null);
  const cancelRef =  useRef(null);
  const titleId = useId();

  const closeModal = () => setShowModal(null);

  useEffect(()=> {
    if(!showModal) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setShowModal(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    cancelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const confirmAddToCart = () => {
    const { clone, ...product } = showModal;
    dispatch({ type: "ADD_TO_CART", payload: product });
    closeModal();
  };

  const trackRef = useRef(null);
  const lockRef = useRef(false);
  const timerRef = useRef(null);
  const touchX = useRef(null);
 
  const [index, setIndex] = useState(CLONES); // start on the first real book
  const [step, setStep] = useState(0); // card width + gap in px
  const [animate, setAnimate] = useState(false);
  const [paused, setPaused] = useState(false);

  // Measure one card step (card width + gap)
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (el && el.children.length > 1) {
      setStep(el.children[1].offsetLeft - el.children[0].offsetLeft);
    }
  }, []);

  useLayoutEffect(() => {
    measure();
    const id = requestAnimationFrame(() => setAnimate(true)); // enable animation after first paint
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // After a slide: if we are on a clone, silently jump to the matching real book
  const settle = useCallback(() => {
    setIndex((i) => {
      if (i >= CLONES + LEN) return i - LEN;
      if (i < CLONES) return i + LEN;
      return i;
    });
    setAnimate(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        lockRef.current = false;
      })
    );
  }, []);
 
  const go = useCallback(
    (dir) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setAnimate(true);
      setIndex((i) => i + dir);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(settle, DURATION + 30);
    },
    [settle]
  );
 
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Infinite autoplay (pauses on hover/focus, off for reduced-motion users)
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go]);
 
  // Touch swipe
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };
 
  const arrowClass =
    'grid size-10 place-items-center rounded-full border border-gray-300 text-[#333] transition hover:border-[#ee7b24] hover:bg-[#ee7b24] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24]';
  
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Best selling featured books"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mx-auto max-w-1400px px-6 py-12 font-['Alike',serif] lg:px-16 lg:py-16"
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <h2 className="text-xl font-medium capitalize text-[#333] sm:text-2xl lg:text-3xl">
          Best selling featured books
        </h2>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#shop"
            className="group inline-flex items-center gap-1 text-base text-[#333] transition-colors hover:text-[#ee7b24] sm:text-lg"
          >
            See all
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => go(-1)} aria-label="Previous books" className={arrowClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next books" className={arrowClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      {/* Infinite slider */}
      <div className="touch-pan-y overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <ul
          ref={trackRef}
          style={{
            transform: `translateX(${-index * step}px)`,
            transitionDuration: animate ? `${DURATION}ms` : '0ms',
          }}
          className="flex gap-6 transition-transform ease-in-out will-change-transform"
        >
          {ITEMS01.map((item, pos) => (
            <li
              key={`${item.id}-${pos}`}
              aria-hidden={item.clone || undefined}
              className="w-[84%] flex-none sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <a
                href="#shop"
                tabIndex={item.clone ? -1 : undefined}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ee7b24]"
              >
                <div className="aspect-3/4 overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    draggable="false"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 line-clamp-2 text-lg text-[#333] transition-colors group-hover:text-[#ee7b24]">
                  {item.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-[#ee7b24]">${item.price}</p>
              </a>
              {/* <button
                type='button'
                tabIndex={item.clone ? -1 : undefined}
                onClick={()=> handleAddToCart(item)}
                className="mt-3 w-full rounded-sm bg-[#ee7b24] py-2.5 cursor-pointer font-medium text-base text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0"
              >
                Add to Cart
              </button> */}
              <button
                type='button'
                tabIndex={item.clone ? -1 : undefined}
                aria-label={`Add ${item.title} to cart`}
                onClick={() => setShowModal(item)}
                className="mt-3 w-full rounded-sm bg-[#ee7b24] py-2.5 cursor-pointer font-medium text-base text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showModal &&
       createPortal(
        <div
          onClick={closeModal}
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="#ee7b24">
                <path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
              </svg>
            </div>

            <h2 id={titleId} className="mt-4 text-xl font-medium text-[#333]">
              Are you confirm add to the cart?
            </h2>
            <p className="mt-2 text-base text-gray-600">
              <span className="text-[#333]">"{showModal.title}"</span> will be add from your cart.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                ref={cancelRef}
                type="button"
                onClick={closeModal}
                className="flex-1 rounded-sm border border-gray-300 py-2.5 text-base text-[#333] transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAddToCart}
                className="flex-1 rounded-sm bg-[#ee7b24] py-2.5 text-base text-white shadow-md shadow-black/20 transition hover:bg-[#d96a16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24]"
              >
                Yes, add
              </button>
            </div>
          </div>
        </div>,
        document.body
       )}
    </section>
  );
}