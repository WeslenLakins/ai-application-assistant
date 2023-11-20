// Bring in jsonwebtoken, express-async-handler, and the User model.
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Subscription = require("../models/subscriptionModel");
const Job = require("../models/jobModel");

// Function to protect routes
const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the user from the database, attach it to the request object, and remove the password from the user object
      req.user = await User.findById(decoded.id).select("-password");

      // Move on to the next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized.");
    }
  }

  // If the token doesn't exist, throw an error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized.");
  }
});

//protect job create route with subscription
const subscriptionProtect = expressAsyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const userJob = await Job.count({ user: _id });
  if (userJob >= 2) {
    const sub = await Subscription.findOne({
      userId: _id,
      subscriptionStatus: "active",
      endDate: { $gte: new Date() },
    }).select({ _id: 1 });
    if (sub) {
      next();
    } else {
      res.status(402);
      throw new Error(
        "You can create more than 2 jobs after active subscription."
      );
    }
  } else {
    next();
  }
});

// Export the protect function
module.exports = { protect, subscriptionProtect };
