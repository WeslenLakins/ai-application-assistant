const asyncHandler = require("express-async-handler");
const Plan = require("../models/planModel");
const User = require("../models/userModel");
const Subscription = require("../models/subscriptionModel");
const PaymentLog = require("../models/paymentLogModel");
const { changeUnixTimestampFormat, compareDate } = require("../common");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @desc:     create checkout session for subscription payment.
// @route:    /api/subscription
// @access:   Private
const createCheckoutSession = asyncHandler(async (req, res) => {
  const params = req.body;
  const planId = params.planId ? params.planId : "";
  const successUrl = params.successUrl ? params.successUrl : "";
  const cancelUrl = params.cancelUrl ? params.cancelUrl : "";

  if (!planId || !successUrl || !cancelUrl) {
    res.status(400);
    throw new Error("Please pass required all parameters.");
  }

  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  const activeSub = await Subscription.findOne({
    userId: _id,
    subscriptionStatus: "active",
    endDate: { $gte: new Date() },
  }).select({ _id: 1 });

  if (activeSub) {
    res.status(401);
    throw new Error("Subscription already exist.");
  }

  const plan = await Plan.findOne({ _id: planId }).select({
    priceId: 1,
    _id: 1,
  });

  if (!plan) {
    res.status(401);
    throw new Error("Plan not found.");
  }
  const reqObj = {
    price: plan.priceId,
    quantity: 1,
  };
  const payment = await PaymentLog.create({
    userId: _id,
    request: reqObj,
  });

  const metaDataObj = {
    paymentLog: payment._id.toString(),
    userId: _id.toString(),
    planId: plan._id.toString(),
  };
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [reqObj],
    mode: "subscription",
    subscription_data: {
      metadata: metaDataObj,
    },
    metadata: metaDataObj,
    // success_url: `${successUrl}?planId=${plan._id.toString()}`,
    success_url: `${successUrl}`,
    cancel_url: `${cancelUrl}?id=${payment._id.toString()}`,
  });

  console.log("session created:-", session);

  res.status(200).json({ url: session.url });
});

// @desc:     handle stripe webhook.
// @route:    /api/subscription/webhook
// @access:   Private
const webHook = asyncHandler(async (req, res) => {
  const params = req.body;
  const { type, data } = params;
  console.log("type===============>", type);
  console.log("data===============>", data);
  const createObj = {
    response: params,
    paymentStatus:
      data.object && data.object.status ? data.object.status : "NO-STATUS",
    event: type,
  };

  //get userId inside metaData object
  if (
    type === "invoice.payment_succeeded" ||
    type === "invoice.updated" ||
    type === "invoice.created"
  ) {
    createObj.userId = data.object.subscription_details.userId;
  } else if (
    type === "customer.subscription.created" ||
    type === "customer.subscription.updated" ||
    type === "checkout.session.completed" ||
    type === "payment_intent.succeeded" ||
    type === "payment_intent.created"
  ) {
    createObj.userId = data.object.metadata.userId;
  }

  //add data in paymentLog table
  if (type !== "charge.succeeded" && type !== "payment_method.attached") {
    await PaymentLog.create(createObj);
  }

  //add data in subscription table when create subscription
  if (type === "customer.subscription.created") {
    const subData = data.object;
    await Subscription.create({
      userId: subData.metadata.userId,
      subscriptionId: subData.id,
      subscriptionStatus: subData.status,
      startDate: changeUnixTimestampFormat(subData.created),
      endDate: changeUnixTimestampFormat(subData.current_period_end),
      paymentStatus: "complete",
      subscriptionType: "new",
      customerId: subData.customer,
      planId: subData.metadata.planId,
    });
  }
  if (type === "customer.subscription.updated") {
    const subData = data.object;
    const sub = await Subscription.findOne({
      subscriptionId: subData.id,
    });
    if (sub) {
      console.log("if1");
      //condition for check when call subscription update like first time subscribe or renew subscription
      if (!compareDate(sub.startDate)) {
        console.log("if2");
        //check condition when call subscription update event for cancel subscription
        if (!subData.cancel_at_period_end) {
          console.log("if3");
          await Subscription.create({
            userId: subData.metadata.userId,
            subscriptionId: subData.id,
            subscriptionStatus: subData.status,
            startDate: changeUnixTimestampFormat(subData.created),
            endDate: changeUnixTimestampFormat(subData.current_period_end),
            paymentStatus: "complete",
            subscriptionType: "renewal",
            customerId: subData.customer,
            planId: subData.metadata.planId,
          });
        }
      } else {
        console.log("else1");
        if (!subData.cancel_at_period_end) {
          console.log("if4");
          await Subscription.updateOne(
            {
              subscriptionId: subData.id,
            },
            {
              subscriptionStatus: subData.status,
            }
          );
        }
      }

      // update payment status in payment log table
      await PaymentLog.updateOne(
        { _id: data.object.metadata.paymentLog },
        {
          response: params,
          paymentStatus:
            data.object.status === "active" ? "success" : data.object.status,
          event: type,
        }
      );
    }
  }
  res.status(200).json();
});

// @desc:     handle cancel payment.
// @route:    /api/subscription/cancel-payment
// @access:   Private
const cancelPayment = asyncHandler(async (req, res) => {
  const params = req.body;
  const paymentId = params.paymentId ? params.paymentId : "";

  if (!paymentId) {
    res.status(400);
    throw new Error("Please pass required all parameters.");
  }
  await PaymentLog.updateOne(
    {
      _id: paymentId,
    },
    { paymentStatus: "cancel", event: "cancel" }
  );
  res.status(200).json({ success: true });
});

// @desc:     handle cancel subscription
// @route:    /api/subscription/cancel
// @access:   Private
const cancelSubscription = asyncHandler(async (req, res) => {
  const params = req.body;
  const subscriptionId = params.subscriptionId ? params.subscriptionId : "";

  if (!subscriptionId) {
    res.status(400);
    throw new Error("Please pass required all parameters.");
  }
  const sub = await Subscription.findOne({ subscriptionId });
  if (!sub) {
    res.status(400);
    throw new Error("Subscription does not exist.");
  }

  //end subscription recurring cycle for cancel subscription
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  res.status(200).json({ success: true });
});

module.exports = {
  createCheckoutSession,
  webHook,
  cancelPayment,
  cancelSubscription,
};
