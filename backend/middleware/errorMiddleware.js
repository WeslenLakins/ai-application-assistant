// Error handler middleware function to catch errors and send a response with the appropriate status code and error message.
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

// Export the errorHandler function.
module.exports = { errorHandler }
