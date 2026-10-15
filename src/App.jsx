import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import FeaturedBooks from './components/FeaturedBooks';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <FeaturedBooks/>
      <Footer/>
    </div>
  )
}

export default App