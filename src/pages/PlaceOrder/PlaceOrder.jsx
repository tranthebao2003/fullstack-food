import React, { useContext, useEffect, useState } from 'react'
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
  const {getTotalCartAmount, token, food_list, cartItems,url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({...data, [name]: value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map(() => {
      if(cartItems[item._id] > 0){
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    console.log(orderItems)
  }

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
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder="Email address" />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder
