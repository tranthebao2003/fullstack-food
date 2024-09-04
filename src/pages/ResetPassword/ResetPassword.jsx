import React, {useEffect, useState } from "react";
import "./ResetPassword.css";
import { assets } from "../../assets/assets";
import axiosInstance from "../../utility/axiosInstance";
import { Rings } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordPopup = ({setShowLogin}) => {
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate()
  // console.log('token in reset password', token)

  const [showHidePassword, setShowHidePassword] = useState("password");
  const [showHideConfirmPassword, setShowHideConfirmPassword] =
    useState("password");

  const [showHideIcon, setShowHideIcon] = useState({
    password: true,
    confirmPassword: true,
  });
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const showHideHandler = (event) => {
    const name = event.target?.name;
    setShowHideIcon((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // test
  useEffect(() => {
    const onChangeType = (showHideIcon) => {
      // console.log('showHideIcon in onchange', showHideIcon)
      if (showHideIcon.password === true) {
        setShowHidePassword("password");
      } else {
        setShowHidePassword("text");
      }

      if (showHideIcon.confirmPassword) {
        setShowHideConfirmPassword("password");
      } else {
        setShowHideConfirmPassword("text");
      }
    };

    onChangeType(showHideIcon);
    // console.log(showHideIcon)
  }, [showHideIcon]);

  const onResetPassword = async (event) => {
    event.preventDefault();
    setLoadingResetPassword(true);

    const response = await axiosInstance.post(`api/reset-password`, {
      ...data,
      token: token,
    });

    if (response.data.success) {
      setLoadingResetPassword(false);
      navigate('/')
      setShowLogin(true)
      alert("Đổi mật khẩu thành công vui lòng đăng nhập lại")
    } else {
      setLoadingResetPassword(false);
      alert(response.data.message);
    }
    
  };

  const progressBar = 250;

  return (
    <div className="resetPassword-popup">
      {loadingResetPassword === true ? (
        <Rings
          width={`${progressBar}`}
          height={`${progressBar}`}
          color="#fd6348"
          wrapperClass="loading-resetPassword"
        />
      ) : (
        <form
          onSubmit={onResetPassword}
          className="resetPassword-popup-container"
        >
          <div className="resetPassword-popup-title">
            <h2>Reset Password</h2>
          </div>
          <div className="resetPassword-popup-inputs">
            {/* password */}
            <div className="password-eye">
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type={`${showHidePassword}`}
                placeholder="Password"
                required
              />
              {showHideIcon.password === false ? (
                <img
                  onClick={showHideHandler}
                  src={assets.eye_hide}
                  className="show-hide-eye"
                  name="password"
                />
              ) : (
                <img
                  onClick={showHideHandler}
                  src={assets.eye_show}
                  className="show-hide-eye"
                  name="password"
                />
              )}
            </div>

            {/* confirm password */}
            <div className="password-eye">
              <input
                name="confirmPassword"
                onChange={onChangeHandler}
                value={data.confirmPassword}
                type={`${showHideConfirmPassword}`}
                placeholder="Confirm Password"
                required
              />
              {showHideIcon.confirmPassword === false ? (
                <img
                  onClick={showHideHandler}
                  src={assets.eye_hide}
                  className="show-hide-eye"
                  name="confirmPassword"
                />
              ) : (
                <img
                  onClick={showHideHandler}
                  src={assets.eye_show}
                  className="show-hide-eye"
                  name="confirmPassword"
                />
              )}
            </div>
          </div>
          <button type="submit">Change Password</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPopup;
