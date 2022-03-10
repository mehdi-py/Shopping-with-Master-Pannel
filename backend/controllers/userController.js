import User from "../models/userModel.js"
import appError from "../utils/appError.js"
import catchAsync from "../utils/catchAsync.js"
import generateToken from "../utils/generateToken.js"

export const authUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    next(new appError("invalid user or password", 401))
  }
})

export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    next(new appError("This Email already exists. Choose another One!", 400))
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    next(new appError("Invalid user data", 400))
  }
})

export const getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    next(new appError("User Not Found", 404))
  }
})

export const updateUserProfile = catchAsync(async (req, res, next) => {
  console.log("updateProfilefromBackEnd: ", req.body)
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    console.log("updateProfilefromBackEnd2: ", user)

    await user.save()

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    next(new appError("User Not Found", 404))
  }
})
