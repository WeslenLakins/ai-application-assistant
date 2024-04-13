const express = require("express");
const router = express.Router();
const { domainSearch } = require("../controllers/domainSearchController");

router.post("/", domainSearch);

module.exports = router;
