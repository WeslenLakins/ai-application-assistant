const express = require("express");
const router = express.Router();
const { webHook } = require("../controllers/subscriptionController");

router.post("/webhook", express.raw({ type: "application/json" }), webHook);

module.exports = router;
