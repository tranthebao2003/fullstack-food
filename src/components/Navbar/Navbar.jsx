import React from 'react'
import { useContext} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const{setToken} = useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <div className='profile-signin'>
        <img className="profile" src={assets.profile_image} alt="" />
          <button onClick={() => logout()}>Log out</button>
        
      </div>
    </div>
  );
}

export default Navbar
