const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    subscriptionStatus: {
      type: String,
      required: true, //active,cancel
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date, //next billing date
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    subscriptionType: {
      type: String, //new, renewal
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscriptions", subscriptionSchema);
