import dotenv from "dotenv"
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const sampleUsers = await User.insertMany(users)
    const adminUser = sampleUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log("Data Imported!")
    process.exit()
  } catch (err) {
    console.log(`Error: ${err}`)
    process.exit(1)
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log("Data Deleted")
    process.exit()
  } catch (err) {
    console.log(`Error: ${err}`)

    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  deleteData()
} else if (process.argv[2] === "-import") {
  importData()
}
