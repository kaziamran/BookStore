import { useCallback, useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets'

const BOOKS = [
  { id: 1, image: assets.FeaturedBooks05, title: 'Demo product title', price: '$79.00', alt: 'Demo product title' },
  { id: 2, image: assets.FeaturedBooks04, title: 'Demo product title', price: '$69.00', alt: 'Demo product title' },
  { id: 3, image: assets.FeaturedBooks03, title: 'Demo product title', price: '$89.00', alt: 'Demo product title' },
  { id: 4, image: assets.FeaturedBooks10, title: 'Demo product title', price: '$119.00', alt: 'Sample product title' },
  { id: 5, image: assets.FeaturedBooks01, title: 'Demo product title', price: '$90.00', alt: 'demo product title' },
  { id: 6, image: assets.FeaturedBooks01, title: 'Demo product title', price: '$99.00', alt: 'demo product title' },
  { id: 7, image: assets.FeaturedBooks01, title: 'Demo product title', price: '$120.00', alt: 'demo product title' },
  { id: 8, image: assets.FeaturedBooks01, title: 'Demo product title', price: '$100.00', alt: 'demo product title' },
];

export default function FeaturedBooks() {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Enable / disable arrows depending on scroll position
  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  // Scroll by exactly one card (card width + gap)
  const slide = (dir) => {
    const el = trackRef.current;
    if (!el || el.children.length < 2) return;
    const step = el.children[1].offsetLeft - el.children[0].offsetLeft;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const arrowClass =
    'grid size-10 place-items-center rounded-full border border-gray-300 text-[#333] transition hover:border-[#ee7b24] hover:bg-[#ee7b24] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] disabled:pointer-events-none disabled:opacity-30';

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Best selling featured books"
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
            <button type="button" onClick={() => slide(-1)} disabled={!canPrev} aria-label="Previous books" className={arrowClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={() => slide(1)} disabled={!canNext} aria-label="Next books" className={arrowClass}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Slider track (native scroll-snap: swipe on touch, arrows on desktop) */}
      <ul
        ref={trackRef}
        onScroll={updateArrows}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-width:none [&::-webkit-scrollbar]:hidden"
      >
        {BOOKS.map((book, i) => (
          <li
            key={book.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${BOOKS.length}`}
            style={{ animationDelay: `${i * 80}ms` }}
            className="animate-fade-up w-[70%] flex-none snap-start sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-7rem)/4)]"
          >
            <a href="#shop" className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ee7b24]">
              <div className="aspect-3/4 overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={book.image}
                  alt={book.alt}
                  loading="lazy"
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
    </section>
  );
}