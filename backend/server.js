import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { notFound, errorHandler } from "./errorMiddleware.js"
import cors from "cors"

dotenv.config() // load .env content into process.env
connectDB() // connect to Atlas Mongoo DataBase

const app = express()
app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

// app.all("*", notFound)  or :   //
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV
app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`))
