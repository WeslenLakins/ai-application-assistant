const mongoose = require("mongoose");

const paymentLogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    request: {
      type: Object,
    },
    response: {
      type: Object,
    },
    status: {
      type: String,
      default: "pending", //pending ,success,cancel, stripe status
    },
    event: {
      type: String,
      required: true,
      default: "pending", //pending,cancel, stripe webhook type
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("paymentLog", paymentLogSchema);
