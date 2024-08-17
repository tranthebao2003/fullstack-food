import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"


// app config
const app = express()
const port = 4000

// middleware
// đặt dữ liệu phân tích vào req.body
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
// nếu endpoint là /api/food thì nó sẽ đến router: foodRouter
app.use("/api/food", foodRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
