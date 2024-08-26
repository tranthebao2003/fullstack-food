import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async (req, res) => {

    // url fronend
    const frontend_url = 'https://fullstack-food-frontend.onrender.com/'

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save()
        // sau khi đặt hàng sau thì mình update lại
        // cartdata rỗng
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}})

        // currency được đổi thành 'vnd', đây là mã ISO cho Đồng Việt Nam. 
        // Stripe sẽ sử dụng đơn vị tiền tệ này cho giao dịch.
        // unit_amount: item.price * 1000:
        // unit_amount là giá mỗi đơn vị sản phẩm, tính bằng đồng 
        // (đơn vị nhỏ nhất của VND).
        // Với VND, giá trị tính bằng đồng (1 VND = 1 đồng, 
        // không có đơn vị nhỏ hơn như xu trong USD hoặc paise trong INR).
        // Nếu item.price là giá của sản phẩm bạn nhập vào 
        // dưới dạng VND, bạn không cần nhân với 1000 nữa, mà có thể giữ nguyên.
        // Ví dụ:
        // Nếu item.price là 50,000 VND, và bạn muốn giá này 
        // là giá mỗi đơn vị sản phẩm, thì unit_amount chỉ cần đặt là item.price.

        const line_items = req.body.items.map((item, index) => ({
            price_data:{
                currency: 'vnd',
                product_data:{
                    name: item.name
                },
                unit_amount: item.price
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: 'vnd',
                product_data:{
                    name: "delivery charges"
                },
                unit_amount: 2
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success: true, session_url:session.url})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error})
    }
}

const vetifyOrder = async (req, res) => {
    const {orderId, success} = req.body
    try {
        if(success ==="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success: true, message: "Paid"})
        } else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false, message: "Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error})
    }
}

// user orders for frontend
const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error})
    }
}

// Listing orders for admin panel
const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find()
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error})
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({success: true, message: "Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export {placeOrder, vetifyOrder, userOrders, listOrders, updateStatus}