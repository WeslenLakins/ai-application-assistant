// Bring in express to create the server, colors to color the console, dotenv to use the .env file, errorHandler to handle errors, & connectDB to connect to the database.
const express = require("express");
require("dotenv").config();
require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const FormData = require("form-data");

let fetch;

import("node-fetch")
	.then((module) => {
		fetch = module.default;
		// You can now use fetch as usual, perhaps inside another function or following logic
	})
	.catch((err) => console.error("Failed to load node-fetch", err));

// Connect to database
connectDB();

// Initialize express
const app = express();
app.use("/api/subscription", require("./routes/webhookRoutes"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the Support Desk API." });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/subscription", require("./routes/subscriptionRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/domain-search", require("./routes/domainSearchRoutes"));

// Error Handler
app.use(errorHandler);

module.exports = app;
