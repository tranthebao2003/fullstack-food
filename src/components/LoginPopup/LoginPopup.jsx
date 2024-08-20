import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const LoginPopup = ({setShowLogin}) => {

  const {setToken, url} = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email:"",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({...data, [name]: value}))
  }

  // test
  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl
    if(currState === 'Login'){
      newUrl = `${url}/api/user/login`
    } else{
       newUrl = `${url}/api/user/register`
    }

    console.log('newurl:', newUrl)
    const response = await axios.post(newUrl, data)

    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    } else{
      toast(response.data.message)
    }
  }

  return (
    <div className="login-popup">
      <form onSubmit = {onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input name='name' onChange={onChangeHandler} value = {data.name} type="text" placeholder="Your name" required />
          )}

          <input name='email' onChange={onChangeHandler} value = {data.email} type="email" placeholder="Your email" required />
          <input name='password' onChange={onChangeHandler} value = {data.password} type="password" placeholder="Password" required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have a account? <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup
