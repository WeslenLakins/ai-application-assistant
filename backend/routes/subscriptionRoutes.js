const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  webHook,
  cancelPayment,
  cancelSubscription,
  getProduct,
  getCurrentSubscription,
} = require("../controllers/subscriptionController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createCheckoutSession);
router.post("/cancel-payment", protect, cancelPayment);
router.post("/cancel", protect, cancelSubscription);
router.get("/product", protect, getProduct);
router.get("/", protect, getCurrentSubscription);
router.post("/webhook", webHook);

module.exports = router;
