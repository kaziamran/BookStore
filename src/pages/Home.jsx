import React from 'react'
import Banner from '../components/Banner'
import FeaturedBooks from '../components/FeaturedBooks'
import CallToAction from '../components/CallToAction'
import SpecialDeal from '../components/SpecialDeal'

const Home = () => {
  return (
    <>
      <Banner/>
      <FeaturedBooks/>
      <SpecialDeal/>
      <CallToAction/>
    </>
  )
}

export default Home