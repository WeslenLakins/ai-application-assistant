const express = require("express");
const router = express.Router();
const {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.route("/").post(protect, admin, createPost).get(getPosts);

router
	.route("/:id")
	.get(getPostById)
	.put(protect, admin, updatePost)
	.delete(protect, deletePost);

module.exports = router;
