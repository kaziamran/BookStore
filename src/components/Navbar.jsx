import React from 'react'

const Navbar = () => {
   return (
    <header className="sticky top-0 z-50 w-full bg-[#d6dbe1] shadow-sm">
      <nav className='container mx-auto flex flex-col items-center gap-3 px-4 py-3 md:flex-row md:justify-between md:px-10'>
        {/* Logo */}
        <a href="/" className="text-2xl font-bold leading-normal text-brand md:text-3xl lg:text-4xl">
          Book Store
        </a>
        {/* Search */}
        <form role="search" className="flex w-full max-w-md overflow-hidden rounded-lg shadow-xs">
          <label htmlFor="book-name" className="sr-only">Search book name</label>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white">
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
            </svg>
          </button>
        </form>
        {/* Links */}
        <ul className="flex items-center gap-5 text-sm font-medium text-gray-700 md:text-base">
          <li><a href="#" className="capitalize transition hover:text-brand">my account</a></li>
          <li><a href="#" className="capitalize transition hover:text-brand">checkout</a></li>
          <li>
            <a href="#" className="flex items-center rounded-lg bg-brand px-4 py-1.5 capitalize text-white transition hover:brightness-110">
              sign in
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar