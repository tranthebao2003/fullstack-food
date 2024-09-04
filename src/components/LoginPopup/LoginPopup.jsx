import React, { useContext, useState} from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from '../../Context/StoreContext';
import { Rings } from "react-loader-spinner";
import axiosInstance from "../../../../frontend/src/utility/axiosInstance";

const LoginPopup = ({ setShowLogin }) => {
  const { setToken,loadingLogin, setLoadingLogin} =
    useContext(StoreContext);
  
  const [showHideEye, setShowHideEye] = useState('password')
  const [showHideIcon, setShowHideIcon] = useState(true)
  const [data, setData] = useState({
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

  // CHƯA XỬ LÝ
  const onLogin = async (event) => {
    event.preventDefault();
    setLoadingLogin(true)

    const response = await axiosInstance.post('/api/admin/login', data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setLoadingLogin(false)
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
          wrapperClass="loadingLogin"
        />
      ) : (
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>Login</h2>
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
          <button type="submit">
            Login
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginPopup;
