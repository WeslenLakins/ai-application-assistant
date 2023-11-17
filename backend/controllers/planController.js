const Plan = require("../models/planModel");
const asyncHandler = require("express-async-handler");

// @desc:     Get plan information.
// @route:    /api/plans
// @access:   Private
const getPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find();
  res.status(200).json(plans);
});

module.exports = {
  getPlans,
};
