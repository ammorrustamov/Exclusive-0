
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home/Home'
import HomePage from './components/HomePage/HomePage'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import SignUp from './components/SignUp/SignUp'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import ProductDetail from './components/ProductDetail'
import ProductSwiper from './components/ProductSwiper'


function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/HomePage' element={<HomePage/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/Wishlist' element={<Wishlist/>}/>
<Route path="/product/:id" element={<ProductDetail />} />
<Route path="/productSwiper" element={<ProductSwiper />} />

      </Routes>
    </>
  )
}

export default App
