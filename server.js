import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import refreshRoute from "./routes/refreshRoute.js"
import forgotPasswordRoute from "./routes/forgotPasswordRoute.js"
import resetPasswordRoute from "./routes/resetPasswordRoute.js"
import adminRoute from "./routes/adminRoute.js"
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js"
import cookie from 'cookie-parser'
import corsOptions from './config/corsOption.js'


// app config
const app = express()
const port = process.env.PORT || 4000

// middleware
// đặt dữ liệu phân tích vào req.body
app.use(express.json())
app.use(cors(corsOptions))

// middleware cookie
app.use(cookie()) 


// db connection
connectDB()

// api endpoints
// nếu endpoint là /api/food thì nó sẽ đến router: foodRouter
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/refresh", refreshRoute)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
// send email
app.use("/api/forgot-password", forgotPasswordRoute)
// send token and new password
app.use("/api/reset-password", resetPasswordRoute)

// login admin
app.use("/api/admin", adminRoute)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
