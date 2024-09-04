import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Signup from './components/Signup/Signup'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  return (
    <>
      {showLogin ? (
        <>
          <LoginPopup setShowLogin={setShowLogin} />{" "}
        </>
      ) : (
        <></>
      )}
      {showSignup ? (
        <>
          <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin}/>{" "}
        </>
      ) : (
        <></>
      )}
      <Navbar setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
      
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Routes>
      <Route path="/reset-password/:token" element={<ResetPassword setShowLogin={setShowLogin}/>} />
      </Routes>
      
      {/* footer mình bỏ ngoài app do 
      mình set css app nó chiếm 80% with toàn app 
      thôi thôi */}
      <Footer />
    </>
  );
}

export default App
