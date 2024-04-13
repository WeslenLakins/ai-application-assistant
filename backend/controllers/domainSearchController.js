const asyncHandler = require("express-async-handler");
let fetch;

import("node-fetch")
	.then((module) => {
		fetch = module.default;
		// You can now use fetch as usual, perhaps inside another function or following logic
	})
	.catch((err) => console.error("Failed to load node-fetch", err));

// @desc    Search for domains using Hunter.io
// @route   POST /api/domain-search
// @access  Public
const domainSearch = asyncHandler(async (req, res) => {
	const { domain, departments } = req.body;

	const API_URL = `https://api.hunter.io/v2/domain-search?domain=${domain}&required_field=full_name&limit=100&type=personal${
		departments ? `&department=${departments}` : ""
	}&api_key=${process.env.HUNTER_API_KEY}`;

	try {
		const hunterResponse = await fetch(API_URL);
		const hunterData = await hunterResponse.json();

		if (!hunterResponse.ok) {
			throw new Error("Failed to fetch data from Hunter.io");
		}

		res.json(hunterData.data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
});

module.exports = { domainSearch };
