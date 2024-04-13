const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		headline: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

postSchema.pre("save", function (next) {
	if (!this.isNew) {
		this.updatedAt = Date.now();
	}
	next();
});

module.exports = mongoose.model("Post", postSchema);
