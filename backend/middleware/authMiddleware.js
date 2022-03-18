import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import appError from "../utils/appError.js"
import catchAsync from "../utils/catchAsync.js"
const protect = catchAsync(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1]
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodedToken.id).select("-password")
      next()
      return
    } catch (error) {
      next(new appError("Not Authorized , token is not valid", 401))
    }
  }
  if (!token) {
    next(new appError("no token", 401))
  }
})

export default protect
