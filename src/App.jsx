import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import FeaturedBooks from './components/FeaturedBooks';
import CallToAction from './components/CallToAction';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <FeaturedBooks/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default App