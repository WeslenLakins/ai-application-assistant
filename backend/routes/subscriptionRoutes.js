const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  cancelSubscription,
  getProduct,
  getCurrentSubscription,
} = require("../controllers/subscriptionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createCheckoutSession);
router.post("/cancel", protect, cancelSubscription);
router.get("/product", protect, getProduct);
router.get("/", protect, getCurrentSubscription);

module.exports = router;
