const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		jobTitle: {
			type: String,
			required: true,
		},
		company: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		jobDescription: {
			type: String,
			required: true,
		},
		currentResume: {
			type: String,
			required: true,
		},
		newResume: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Resume", resumeSchema);
