import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axiosInstance from "../../utility/axiosInstance";
import { useNavigate } from "react-router-dom";

// ở đây mình có sử dụng 1 phần html trong cart nhưng
// ko hề import file css của cart nhưng css trong phần
// cart vẫn có tác dụng, bởi vì khi import tệp
// CSS vào một thành phần, các kiểu trong tệp đó sẽ
// được áp dụng trên toàn bộ ứng dụng. Điều này là
// do CSS mặc định trong React là toàn cục, và
// không giới hạn phạm vi chỉ trong thành phần
// mà nó được import vào.
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list?.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50000,
    };

    let response = await axiosInstance.post(`/api/order/place`, orderData);
    // chỉnh là chuyển hướng sang thanh toán stripe
    if (response.data.success) {
      const { session_url } = response.data;
      // Khi sử dụng window.location.replace,
      // trang hiện tại sẽ được thay thế trong
      // lịch sử trình duyệt, nghĩa là người
      // dùng không thể quay lại trang trước đó
      // bằng cách nhấn nút "Back" trên trình duyệt.
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      alert("Bạn vui lòng đăng nhập!");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
      alert("Bạn vui lòng chọn hàng!");
    }
  }, [token]);

  // test
  // useEffect(() => {
  //   console.log(data)
  // },[data])

  // input là inline còn div là block
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Infomation</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 50000}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50000}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
