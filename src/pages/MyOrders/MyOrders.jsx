import React, { useContext, useEffect,useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import axiosInstance from '../../utility/axiosInstance'

const MyOrders = () => {

    const {token} = useContext(StoreContext)
    const [data, setData] = useState([])
    const [category, setCategory] = useState('All')

    const  fetchOrders = async () => {
        const response = await axiosInstance.post(`/api/order/userorders/${category}`, {})
        setData(response.data.data)
    }

    useEffect(() => {
        if(token){
            fetchOrders()
        }
    }, [token, category])

  return (
    <div className='my-orders'>
      <div className="header-category">
        <h3>My Orders</h3>
        <select onChange={(e) => setCategory(e.target.value)} className="category">
          <option value="All">All</option>
          <option value="Delivery">Delivery</option>
          <option value="Food Processing">Food Processing</option>
          <option value="Out for delivery">Out for delivery</option>
        </select>
      </div>
      <div className='container'>
        {data.map((order, index) => {
            return(
                <div key = {index} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item, index) => {
                        if(index === order.items.length - 1){
                            return item.name + " x " + item.quantity
                        } else{
                            return item.name + " x " + item.quantity+ ", "
                        }
                    })}</p>
                    <p>{order.amount} Đ</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    <button onClick={() => fetchOrders()}>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders
