import React from 'react'
import { assets } from '../assets/assets'
import { useEffect, useState } from 'react';

const SLIDES = [
  {
    id: 1,
    tag: 'Huge Sale',
    title: 'Big Savings on Your Favorite Books',
    price: 'Now starting at £89.00',
    button: { label: 'Shop now', href: '#shop' },
    image: assets.bannerImg01,
    alt: 'Stack of books on sale',
  },
  {
    id: 2,
    tag: '50% Sale',
    title: 'Collect your best Authors Novel',
    price: 'Now starting at £99.00',
    button: { label: 'Shop now', href: '#shop' },
    image: assets.bannerImg02,
    alt: 'Novels by popular authors',
  },
  {
    id: 3,
    tag: 'Free Delivery',
    title: 'On the November month',
    price: 'Only selected books' ,
    button: { label: 'Check now', href: '#shop' },
    image: assets.bannerImg03,
    alt: 'Books ready for delivery',
  },
];

const AUTOPLAY_MS = 5000;

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = SLIDES.length;
  const next = () => setCurrent((i) => (i + 1) % total);
  const prev = () => setCurrent((i) => (i - 1 + total) % total);

  // Autoplay (restarts after every manual change, pauses on hover/focus)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, current]);

  const slide = SLIDES[current];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sale banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative isolate overflow-hidden bg-[#c6e5de] pt-4 pb-10"
    >
      {/* soft decorative glow */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-1/2 -z-10 size-96 -translate-y-1/2 rounded-full bg-white/30 blur-3xl"
      />

      {/* key={slide.id} remounts the slide so animations replay on every change */}
      <div
        key={slide.id}
        role="group"
        aria-roledescription="slide"
        aria-label={`${current + 1} of ${total}`}
        className="mx-auto grid min-h-560px max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 sm:px-16 md:min-h-520px md:grid-cols-2 lg:min-h-640px"
      >
        {/* Left: content */}
        <div className="mx-auto w-fit max-w-xl text-center font-['Alike',serif]">
          <h2 className="animate-slide-right text-3xl text-white drop-shadow-md [animation-delay:100ms] lg:text-5xl">
            {slide.tag}
          </h2>

          <h1 className="animate-fade-up mt-1 text-4xl leading-tight text-[#333] [animation-delay:300ms] sm:text-4xl lg:text-6xl">
            {slide.title}
          </h1>

          {slide.price && (
            <p className="animate-fade-up mt-3 text-lg text-gray-600 [animation-delay:500ms] sm:text-2xl lg:mt-4 lg:text-3xl">
              {slide.price}
            </p>
          )}

          <a
            href={slide.button.href}
            className="animate-pop-in mt-6 inline-block rounded-sm bg-[#ee7b24] px-10 py-2.5 text-lg text-white capitalize shadow-md shadow-black/30 transition duration-300 [animation-delay:700ms] hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0 sm:mt-8 sm:text-2xl lg:mt-10 lg:px-12 lg:py-3"
          >
            {slide.button.label}
          </a>
        </div>

        {/* Right: image */}
        <div className="animate-slide-left [animation-delay:200ms]">
          <img
            src={slide.image}
            alt={slide.alt}
            width="950"
            height="700"
            className="mx-auto h-60 w-full max-w-xl rounded-lg object-cover shadow-xl shadow-black/20 sm:h-80 lg:h-460px"
          />
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-[#333] shadow transition hover:bg-white focus-visible:outline-2 focus-visible:outline-[#ee7b24] sm:grid"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-[#333] shadow transition hover:bg-white focus-visible:outline-2 focus-visible:outline-[#ee7b24] sm:grid"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#ee7b24] ${
              i === current ? 'w-8 bg-[#ee7b24]' : 'w-2.5 bg-[#333]/40 hover:bg-[#333]/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}