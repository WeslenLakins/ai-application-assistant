const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(403);
		throw new Error("Access denied, not an admin");
	}
};

module.exports = { admin };
