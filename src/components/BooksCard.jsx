import React from 'react'

const BooksCard = ({item}) => {
  return (
    <div>
        <div className='aspect-3/4 overflow-hidden rounded-sm bg-gray-100'>
            <img 
            className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
            src={item.image} alt={item.alt} />
        </div>
    </div>
  )
}

export default BooksCard