import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin, setShowSignup}) => {
  const [menu, setMenu] = useState("home")
  const [sticky, setSticky] = useState('')
  const{getTotalCartAmount, token, setToken} = useContext(StoreContext)
  
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  const handleScroll = () => {
    if(window.scrollY > 70){
      setSticky('sticky')
    } else{
      setSticky('')
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollHome = () => {
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
    setMenu("home")
  }

  const btnLogin = () => {
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
    setShowLogin(true)
  }

  const btnSigup = () => {
    window.scrollTo({
      top: 0,
      behavior:'smooth'
    })
    setShowSignup(true)
  }

  return (
    <div className={`navbar ${sticky}`}>
      <Link to="/">
        <img
          src={assets.logo}
          alt=""
          className="logo"
          onClick={() => scrollHome()}
        />
      </Link>
      <ul className="navbar-menu">
        <a
          onClick={() => scrollHome()}
          className={menu === "home" ? "active" : ""}
        >
          home
        </a>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <div className='sign-in-up'>
            <button className='sign-in' onClick={() => btnLogin()}>sign in</button>
            <button className='sign-up' onClick={() => btnSigup()}>sign up</button>
          </div>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                Orders
              </li>
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar
