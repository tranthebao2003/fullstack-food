import React from 'react'
import './Orders.css'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axiosInstanceAdmin from '../../../utilities/axiosInstanceAdmin.js'
import { assets } from '../../assets/assets.js'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [category, setCategory] = useState('All')

  const fetchAllOrders = async () => {
    const response = await axiosInstanceAdmin.get(`/api/order/list/${category}`)
    if(response.data.success){
      setOrders(response.data.data)
    } else{
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    // console.log(event)
    const response = await axiosInstanceAdmin.post(`/api/order/status`, {
      orderId: orderId,
      status: event.target.value,
    })

    if(response.data.success){
      await fetchAllOrders()
    } else{
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [category])

  return (
    <div className="order add">
      <div className="header-category">
        <h3>Order Page</h3>
        <select onChange={(e) => setCategory(e.target.value)} className="category">
          <option value="All">All</option>
          <option value="Delivery">Delivery</option>
          <option value="Food Processing">Food Processing</option>
          <option value="Out for delivery">Out for delivery</option>
        </select>
      </div>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>{order.amount} Đ</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders