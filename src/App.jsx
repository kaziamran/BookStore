import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import FeaturedBooks from './components/FeaturedBooks';
import CallToAction from './components/CallToAction';
import Home from './pages/Home';
import MyCart from './pages/MyCart';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/mycart' element={<MyCart/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App