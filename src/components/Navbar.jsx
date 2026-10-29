import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Top bar (light background)
const topLinkClass = ({ isActive }) =>
  `capitalize transition-colors ${
    isActive ? "font-semibold text-brand" : "hover:text-brand"
  }`;

// Black bar, desktop
const darkLinkClass = ({ isActive }) =>
  `border-b-2 capitalize transition-colors duration-300 ${
    isActive
      ? "border-brand font-semibold text-brand"
      : "border-transparent text-white hover:text-brand"
  }`;

// Black bar, mobile dropdown
const mobileLinkClass = ({ isActive }) =>
  `block border-b border-white/10 py-3 capitalize transition-colors last:border-b-0 ${
    isActive ? "font-semibold text-brand" : "text-white hover:text-brand"
  }`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="book-store-header w-full bg-[#d6dbe1] shadow-sm">
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
        <div className="flex items-center gap-5 text-sm font-medium text-gray-700 md:text-base">
          <NavLink to="/signup" className={topLinkClass}>
            my account
          </NavLink>
          <NavLink to="/checkout" className={topLinkClass}>
            checkout
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center rounded-lg bg-brand px-4 py-1.5 capitalize text-white transition hover:brightness-110 ${
                isActive ? "ring-2 ring-brand/40 ring-offset-2 ring-offset-[#d6dbe1]" : ""
              }`
            }
          >
            sign in
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;