import React from 'react';
import SpecialDealImage from '../assets/special-deal-bg.jpg';
import { assets } from '../assets/assets';

const DEALS = [
  { id: 1, image: assets.SpecialDealImage01, alt: 'Special deal 1', href: '#' },
  { id: 2, image: assets.SpecialDealImage02, alt: 'Special deal 2', href: '#' },
];

const SpecialDeal = () => {
  return (
    <section
      aria-label="Special deal package"
      style={{ backgroundImage: `url(${SpecialDealImage})` }}
      className="flex min-h-500px items-center bg-cover bg-center bg-no-repeat px-6 py-12 lg:px-16 lg:py-16"
    >
      <div className="mx-auto grid max-w-1400px gap-6 sm:grid-cols-2 lg:gap-7">
        {DEALS.map((deal) => (
          <a
            key={deal.id}
            href={deal.href}
            className="group relative block overflow-hidden rounded shadow-md transition duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ee7b24]"
          >
            <img
              src={deal.image}
              alt={deal.alt}
              draggable="false"
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark tint on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30"
            />

            {/* "Shop now" label slides up on hover */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-6 rounded-sm bg-[#ee7b24] px-8 py-2.5 font-['Alike',serif] text-lg text-white opacity-0 shadow-md shadow-black/30 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              Shop now
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SpecialDeal;