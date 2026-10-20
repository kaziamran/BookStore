import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/mycart' element={<MyCart/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App