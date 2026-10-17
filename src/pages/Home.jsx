import React from 'react'
import Banner from '../components/Banner'
import FeaturedBooks from '../components/FeaturedBooks'
import CallToAction from '../components/CallToAction'


const Home = () => {
  return (
    <div>
        <Banner/>
        <FeaturedBooks/>
        <CallToAction/>
    </div>
  )
}

export default Home