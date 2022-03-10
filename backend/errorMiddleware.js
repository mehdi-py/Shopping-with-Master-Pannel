import appError from "./utils/appError.js"

export const notFound = (req, res, next) => {
  next(new appError(`Requested Page Not Found -${req.originalUrl}`, 404))
}

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode)
  res.json({
    message: err.message,
    status: err.status,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    isOperational: err.isOperational,
  })
}

// export { notFound, errorHandler }
