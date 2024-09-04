import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axiosInstance from "../../utility/axiosInstance";
import { StoreContext } from "../../context/StoreContext";
import { Rings } from "react-loader-spinner";


const LoginPopup = ({ setShowLogin }) => {
  const { setToken, loadCartData, loadingLogin, setLoadingLogin } =
    useContext(StoreContext);
  
  const [showHideEye, setShowHideEye] = useState('password')
  const [showHideIcon, setShowHideIcon] = useState(true)
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const showHideHandler = () => {
    if(showHideEye === 'password'){
      setShowHideEye('text')
      setShowHideIcon(false)
    } else{
      setShowHideEye('password')
      setShowHideIcon(true)
    }
  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // test
  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const onLogin = async (event) => {
    event.preventDefault();
    setLoadingLogin(true)
    let newUrl;
    if (currState === "Login") {
      newUrl = `/api/user/login`;
    } else {
      newUrl = `/api/forgot-password`;
    }

    const response = await axiosInstance.post(`${newUrl}`, data);

    if (response.data.success) {
      if(currState === 'Login') {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        // console.log('response.data.token in loginPopup: ', response.data.token)
        await loadCartData(response.data.token);
      } else{
        alert(response.data.message)
      }

      setLoadingLogin(false)
      setShowLogin(false)
    } else {
      setLoadingLogin(false)
      alert(response.data.message);
    }
  };

  const progressBar = 250;

  return (
    <div className="login-popup">
      {loadingLogin === true ? (
        <Rings
          width={`${progressBar}`}
          height={`${progressBar}`}
          color="#fd6348"
          wrapperClass="loading-Login"
        />
      ) : (
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-inputs">
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
            {currState === "Login" ? (
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
            ) : (
              <></>
            )}
          </div>
          <button type="submit">
            {currState === "Forgot Password" ? "Continue" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
          {currState === "Login" ? (
            <p>
              Forgot password ?{" "}
              <span onClick={() => setCurrState("Forgot Password")}>
                <u>Click here</u>
              </span>
            </p>
          ) : (
            <p>
              Already have a account ?{" "}
              <span onClick={() => setCurrState("Login")}>
                <u>Login here</u>
              </span>
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginPopup;
