// Bring in express to create the server, colors to color the console, dotenv to use the .env file, errorHandler to handle errors, & connectDB to connect to the database.
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// Set the port number to 5000 or the port number in the .env file.
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Initialize express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API.' })
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
