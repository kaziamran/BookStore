import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: 'home', to: '/' },
  { label: 'shop', to: '#' },
  { label: 'categories', to: '#' },
  { label: 'contact', to: '#' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useCart();

  const totalItems = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const [menuOpen, setMenuOpen] = useState(false);
 
  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);
 
  const linkClass = 'capitalize text-white transition hover:text-brand';

  return (
    <div>
      <header className="book-store-header sticky top-0 z-50 w-full bg-[#d6dbe1] shadow-sm">
        <nav className="flex flex-col items-center gap-3 px-5 py-3 lg:flex-row lg:justify-between lg:px-16">
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold leading-normal text-brand md:text-3xl lg:text-4xl"
          >
            Book Store
          </a>
          {/* Search */}
          <form
            role="search"
            className="flex w-full max-w-md overflow-hidden rounded-lg shadow-xs"
          >
            <label htmlFor="book-name" className="sr-only">
              Search book name
            </label>
            <input
              type="text"
              name="book-name"
              id="book-name"
              placeholder="Search book name"
              className="w-full bg-blue-100 px-4 py-2 text-gray-800 placeholder:text-gray-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-brand"
            />
            <button
              type="submit"
              aria-label="Search"
              className="bg-brand px-4 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-white"
              >
                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
              </svg>
            </button>
          </form>
          {/* Links */}
          <ul className="flex items-center gap-5 text-sm font-medium text-gray-700 md:text-base">
            <li>
              <Link to="#" className="capitalize transition hover:text-brand">
                my account
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="capitalize transition hover:text-brand">
                checkout
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center rounded-lg bg-brand px-4 py-1.5 capitalize text-white transition hover:brightness-110"
              >
                sign in
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      
      <div className="relative bg-black px-6 py-3 lg:px-16">
        <nav aria-label="Main navigation" className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center">
            {/* Mobile: menu icon */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-ml-1 grid size-10 cursor-pointer place-items-center rounded text-white transition hover:text-brand focus-visible:outline-2 focus-visible:outline-brand md:hidden"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-7" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-7" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
  
            {/* Desktop: links */}
            <ul className="hidden items-start gap-5 font-['Inter',serif] text-lg font-medium md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Cart (unchanged) */}
          <div className="relative flex items-center justify-end">
            <button
              onClick={() => navigate('/mycart')}
              className="cart-box flex cursor-pointer items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
                fill="rgba(255,255,255,1)"
              >
                <path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -bottom-2.5 -left-2.5 flex h-4 w-4 items-center justify-center rounded-2xl bg-red-600 p-3 text-[18px] text-white">
                  {totalItems}
                </span>
              )}
              <p className="text-sm font-medium capitalize text-white lg:text-lg">My Cart</p>
            </button>
          </div>
        </nav>
 
        {/* Mobile dropdown (slides open under the bar) */}
        <div
          id="mobile-menu"
          className={`absolute inset-x-0 top-full z-40 grid border-t border-white/10 bg-black transition-[grid-template-rows,visibility] duration-300 md:hidden ${
            menuOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr] border-transparent'
          }`}
        >
          <ul className="flex flex-col overflow-hidden px-3 font-['Inter',serif] text-lg font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="border-b border-white/10 last:border-b-0">
                <Link to={link.to} onClick={() => setMenuOpen(false)} className={`${linkClass} block py-3`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
