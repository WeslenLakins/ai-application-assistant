// Bring in mongoose.
const mongoose = require('mongoose')

// Create a function to connect to the database.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    )
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

// Export the connectDB function.
module.exports = connectDB
