import express from 'express'
import authMiddleware from "../middleware/auth.js"
import { placeOrder, vetifyOrder, userOrders, listOrders, updateStatus} from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify', vetifyOrder)
orderRouter.post('/userorders/:category', authMiddleware, userOrders)
orderRouter.get('/list/:category', authMiddleware, listOrders)
// cho admin chưa xử lí
orderRouter.post('/status', authMiddleware, updateStatus)

export default orderRouter