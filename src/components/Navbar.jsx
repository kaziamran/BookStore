import React from 'react'

const Navbar = () => {
   return (
    <div>
      <div className="bookstore-navbar w-auto flex justify-between">
        <div className="bookstore-logo">
          <h2 className=''>Book Store</h2>
        </div>
        <div className="bookstore-search-option">
          <form>
            <input type="text" name="" id="" placeholder='Search with product name' />
            <button type="submit"></button>
          </form>
        </div>
        <div className="bookstore-links">
          <ul>
            <li><a href="">my account</a></li>
            <li><a href="">checkout</a></li>
            <li><a href="">sign in</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar