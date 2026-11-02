import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AccountLayout from './layouts/AccountLayout';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Dashboard from './accounts/Dashboard';

const App = () => {

  return (
    <div>
     <BrowserRouter>
      <Routes>
        {/* public UI */}
        <Route element={<PublicLayout/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/shop' element={<Shop/>}></Route>
          <Route path='/categories' element={<Categories/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/mycart' element={<MyCart/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
        </Route>

        {/* account UI */}
        <Route path='/dashboard' element={<AccountLayout/>}>
          <Route index element={<Dashboard/>}></Route>
        </Route>
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App