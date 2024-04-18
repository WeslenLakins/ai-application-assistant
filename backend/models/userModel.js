// Bring in mongoose
const mongoose = require("mongoose");

// Create a user schema model
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your name."],
		},
		email: {
			type: String,
			required: [true, "Please enter your email."],
			unique: true,
		},
		password: {
			type: String,
			required: [
				function () {
					return !this.isOAuth;
				},
				"Password is required",
			],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		isOAuth: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// Export the user model schema as a model named 'User' using the userSchema model and the mongoose.model() method.
module.exports = mongoose.model("User", userSchema);
