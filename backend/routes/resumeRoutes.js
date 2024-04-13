const express = require("express");
const router = express.Router();
const {
	createResume,
	getResumes,
	getResumeById,
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createResume).get(protect, getResumes);

router.route("/:id").get(protect, getResumeById);

module.exports = router;
