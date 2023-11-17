const express = require("express");
const router = express.Router();
const { getPlans } = require("../controllers/planController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getPlans);

module.exports = router;
