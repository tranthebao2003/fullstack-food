import React, { useContext, useEffect, useState } from "react";
import "./Signup.css";
import { assets } from "../../assets/assets";
import axiosInstance from "../../utility/axiosInstance";
import { StoreContext } from "../../context/StoreContext";
import { Rings } from "react-loader-spinner";


const Signup = ({ setShowSignup, setShowLogin}) => {
  const { loadingSignup, setLoadingSignup} = useContext(StoreContext);

  const [showHideEye, setShowHideEye] = useState("password");
  const [showHideIcon, setShowHideIcon] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const showHideHandler = () => {
    if (showHideEye === "password") {
      setShowHideEye("text");
      setShowHideIcon(false);
    } else {
      setShowHideEye("password");
      setShowHideIcon(true);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // test
  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const onSignup = async (event) => {
    event.preventDefault();
    setLoadingSignup(true);

    const response = await axiosInstance.post(`/api/user/register`, data);

    alert(response.data.message);
    if (response.data.success) {
      setLoadingSignup(false);
      setShowSignup(false);
      setShowLogin(true)
    }
    setLoadingSignup(false);
   
  };

  const progressBar = 250;

  return (
    <div className="signup-popup">
      {loadingSignup === true ? (
        <Rings
          width={`${progressBar}`}
          height={`${progressBar}`}
          color="#fd6348"
          wrapperClass="loading-signup"
        />
      ) : (
        <form onSubmit={onSignup} className="signup-popup-container">
          <div className="signup-popup-title">
            <h2>Sign Up</h2>
            <img
              onClick={() => setShowSignup(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="signup-popup-inputs">
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />

            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
            <div className="password-eye">
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type={`${showHideEye}`}
                placeholder="Password"
                required
              />
              {showHideIcon === false ? (
                <img
                  onClick={() => showHideHandler()}
                  src={assets.eye_hide}
                  className="show-hide-eye"
                />
              ) : (
                <img
                  onClick={() => showHideHandler()}
                  src={assets.eye_show}
                  className="show-hide-eye"
                />
              )}
            </div>
          </div>
          <button type="submit">
            Sign Up
          </button>
          <div className="signup-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
