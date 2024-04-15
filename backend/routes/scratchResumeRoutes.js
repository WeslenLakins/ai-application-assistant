const express = require("express");
const router = express.Router();
const {
	createScratchResume,
	getScratchResumes,
	getScratchResumeById,
} = require("../controllers/scratchResumeController");

const { protect } = require("../middleware/authMiddleware");

router
	.route("/")
	.post(protect, createScratchResume)
	.get(protect, getScratchResumes);

router.route("/:id").get(protect, getScratchResumeById);

module.exports = router;
