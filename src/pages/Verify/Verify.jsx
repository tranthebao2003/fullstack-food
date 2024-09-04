import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosInstance from '../../utility/axiosInstance'

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  // lấy params từ placeOrder từ file orderController
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  console.log('success: ',success)
  console.log('orderId: ',orderId)

  const navigate = useNavigate()

  const verifyPayment = async () => {
    const response = await axiosInstance.post(`/api/order/verify`, {success, orderId})
    if(response.data.success){
      alert('Thanh toán thành công')
      navigate('/myorders')
    } else{
      alert('Chưa thanh toán thành công')
      navigate('/')
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [success, orderId])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
