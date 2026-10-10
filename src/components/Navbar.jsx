import React from 'react'

const Navbar = () => {
   return (
    <div>
      <div className="bookstore-navbar w-full bg-[#d6dbe1]">
        <div className='container mx-auto flex justify-between items-center px-10 py-3'>
         <div className="bookstore-logo">
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-left leading-normal text-brand'>Book Store</h2>
         </div>
         <div className="bookstore-search-option">
          <form>
            <input type="text" name="book-name" id="book-name" className='bg-blue-200' placeholder='Search book name' />
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
            </button>
          </form>
         </div>
         <div className="bookstore-links">
          <ul className='flex gap-5'>
            <li><a href="" className='capitalize'>my account</a></li>
            <li><a href="" className='capitalize'>checkout</a></li>
            <li><a href="" className='capitalize'>sign in</a></li>
          </ul>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar