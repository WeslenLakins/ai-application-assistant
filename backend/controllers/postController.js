const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find({});

	res.status(200).json(posts);
});

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (post) {
		res.status(200).json(post);
	} else {
		res.status(404);
		throw new Error("Post not found");
	}
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
	const { title, content, headline, author } = req.body;

	if (!title || !content || !headline || !author) {
		res.status(400);
		throw new Error("All fields are required");
	}

	const post = new Post({
		title,
		content,
		headline,
		author,
	});

	const createdPost = await post.save();

	res.status(201).json(createdPost);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
	const { title, content, headline } = req.body;

	const post = await Post.findById(req.params.id);

	if (post) {
		post.title = title;
		post.content = content;
		post.headline = headline;

		const updatedPost = await post.save();
		res.json(updatedPost);
	} else {
		res.status(404);
		throw new Error("Post not found");
	}
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

	if (post) {
		await Post.deleteOne({ _id: req.params.id });
		res.json({ message: "Post removed" });
	} else {
		res.status(404);
		throw new Error("Post not found");
	}
});

module.exports = { getPosts, createPost, getPostById, updatePost, deletePost };
