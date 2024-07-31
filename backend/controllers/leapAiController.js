const asyncHandler = require("express-async-handler");
const fetch = require("node-fetch");

// @desc    Run a Leap AI workflow
// @route   POST /api/leap-ai
// @access  Public
const runLeapAiWorkflow = asyncHandler(async (req, res) => {
	const { workflow_id, input } = req.body;

	try {
		const response = await fetch("https://api.workflows.tryleap.ai/v1/runs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": process.env.LEAPAI_API_KEY,
			},
			body: JSON.stringify({ workflow_id, input }),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Failed to call Leap AI API");
		}

		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
});

// @desc    Get Leap AI workflow run details
// @route   GET /api/leap-ai/runs/:workflow_run_id
// @access  Public
const getWorkflowRunDetails = asyncHandler(async (req, res) => {
	const { workflow_run_id } = req.params;

	try {
		const response = await fetch(
			`https://api.workflows.tryleap.ai/v1/runs/${workflow_run_id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-Api-Key": process.env.LEAPAI_API_KEY,
				},
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || "Failed to fetch workflow run details"
			);
		}

		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
});

module.exports = { runLeapAiWorkflow, getWorkflowRunDetails };
