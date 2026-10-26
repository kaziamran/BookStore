import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { app } from './firebase'
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Contact from './pages/Contact';

const auth = getAuth(app);

const App = () => {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/shop' element={<Shop/>}></Route>
        <Route path='/categories' element={<Categories/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/mycart' element={<MyCart/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App