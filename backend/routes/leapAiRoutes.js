const express = require("express");
const router = express.Router();
const {
	runLeapAiWorkflow,
	getWorkflowRunDetails,
} = require("../controllers/leapAiController");

router.post("/", runLeapAiWorkflow);
router.get("/runs/:workflow_run_id", getWorkflowRunDetails);

module.exports = router;
