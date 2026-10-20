import React from 'react'
import Banner from '../components/Banner'
import FeaturedBooks from '../components/FeaturedBooks'
import CallToAction from '../components/CallToAction'
import SpecialDeal from '../components/SpecialDeal'


const Home = () => {
  return (
    <div>
        <Banner/>
        <FeaturedBooks/>
        <SpecialDeal/>
        <CallToAction/>
    </div>
  )
}

export default Home