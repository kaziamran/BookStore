import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets'

const BOOKS = [
  { id: 1, image: assets.FeaturedBooks05, title: 'Demo product title', price: '$79.00', alt: 'Demo product title' },
  { id: 2, image: assets.FeaturedBooks04, title: 'Sample product title', price: '$69.00', alt: 'Demo product title' },
  { id: 3, image: assets.FeaturedBooks03, title: 'Demo product title', price: '$89.00', alt: 'Demo product title' },
  { id: 4, image: assets.FeaturedBooks10, title: 'Sample product title', price: '$119.00', alt: 'Sample product title' },
  { id: 5, image: assets.FeaturedBooks08, title: 'Demo product title', price: '$90.00', alt: 'demo product title' },
  { id: 6, image: assets.FeaturedBooks06, title: 'Sample product title', price: '$99.00', alt: 'demo product title' },
  { id: 7, image: assets.FeaturedBooks09, title: 'Demo product title', price: '$120.00', alt: 'demo product title' },
  { id: 8, image: assets.FeaturedBooks11, title: 'Sample product title', price: '$100.00', alt: 'demo product title' },
];

const LEN = BOOKS.length;
const CLONES = 4; // copies at each end (>= the most cards visible at once)
const DURATION = 500; // slide animation (ms)
const AUTOPLAY_MS = 3000; // time between automatic slides
 
// [last 4 clones] + [8 real books] + [first 4 clones]
const ITEMS = [
  ...BOOKS.slice(-CLONES).map((b) => ({ ...b, clone: true })),
  ...BOOKS.map((b) => ({ ...b, clone: false })),
  ...BOOKS.slice(0, CLONES).map((b) => ({ ...b, clone: true })),
];

export default function FeaturedBooks() {
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
          {ITEMS.map((book, pos) => (
            <li
              key={`${book.id}-${pos}`}
              aria-hidden={book.clone || undefined}
              className="w-[70%] flex-none sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <a
                href="#shop"
                tabIndex={book.clone ? -1 : undefined}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ee7b24]"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
                  <img
                    src={book.image}
                    alt={book.alt}
                    draggable="false"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 line-clamp-2 text-lg text-[#333] transition-colors group-hover:text-[#ee7b24]">
                  {book.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-[#ee7b24]">{book.price}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}