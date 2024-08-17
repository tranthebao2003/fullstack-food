import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';

// ở đây mình có sử dụng 1 phần html trong cart nhưng
// ko hề import file css của cart nhưng css trong phần
// cart vẫn có tác dụng, bởi vì khi import tệp 
// CSS vào một thành phần, các kiểu trong tệp đó sẽ 
// được áp dụng trên toàn bộ ứng dụng. Điều này là 
// do CSS mặc định trong React là toàn cục, và 
// không giới hạn phạm vi chỉ trong thành phần 
// mà nó được import vào. 
const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext)

  // input là inline còn div là block
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Infomation</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="text" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
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
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder
