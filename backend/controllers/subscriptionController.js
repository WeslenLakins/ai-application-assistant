const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Subscription = require("../models/subscriptionModel");
const PaymentLog = require("../models/paymentLogModel");
const Job = require("../models/jobModel");
const { changeUnixTimestampFormat } = require("../common");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handleCreateSubscription = async (subData, subscriptionType) => {
  return await Subscription.create({
    userId: subData.metadata.userId,
    subscriptionId: subData.id,
    subscriptionStatus: subData.status,
    startDate: changeUnixTimestampFormat(subData.created),
    endDate: changeUnixTimestampFormat(subData.current_period_end),
    paymentStatus: "complete",
    subscriptionType: subscriptionType,
    customerId: subData.customer,
    priceId: subData.metadata.priceId,
  });
};

// @desc:     create checkout session for subscription payment.
// @route:    /api/subscription
// @access:   Private
const createCheckoutSession = asyncHandler(async (req, res) => {
  const params = req.body;
  const priceId = params.priceId ? params.priceId : "";
  const type = params.type ? params.type : "";
  const successUrl = params.successUrl ? params.successUrl : "";
  const cancelUrl = params.cancelUrl ? params.cancelUrl : "";

  if (!successUrl || !cancelUrl || !priceId) {
    res.status(400);
    throw new Error("Please pass required all parameters.");
  }
  if (type && type !== "trial") {
    res.status(400);
    throw new Error("Please pass valid type");
  }

  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const activeSub = await Subscription.findOne({
    $and: [
      { userId: _id },
      {
        $or: [
          { subscriptionStatus: "active" },
          { subscriptionStatus: "trialing" },
        ],
      },
      { endDate: { $gte: new Date() } },
    ],
  }).select({ _id: 1 });

  if (activeSub) {
    res.status(400);
    throw new Error("Subscription already exist.");
  }

  const reqObj = {
    price: priceId,
    quantity: 1,
  };
  const metaDataObj = {
    userId: _id.toString(),
    priceId: priceId,
  };
  const subscription_data = {
    metadata: metaDataObj,
  };
  if (type === "trial") {
    subscription_data.trial_settings = {
      end_behavior: {
        missing_payment_method: "cancel",
      },
    };
    subscription_data.trial_period_days = 3;
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [reqObj],
      mode: "subscription",
      subscription_data,
      customer_email: user.email,
      metadata: metaDataObj,
      success_url: `${successUrl}`,
      cancel_url: `${cancelUrl}`,
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// @desc:     handle stripe webhook.
// @route:    /api/subscription/webhook
// @access:   Private
const webHook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY
    );
    const { type, data } = event;
    const paymentArr = [
      "checkout.session.completed",
      "payment_intent.created",
      "payment_intent.succeeded",
      "invoice.paid",
    ];
    const subscriptionArr = [
      "customer.subscription.created",
      "customer.subscription.updated",
    ];
    if (!paymentArr.includes(type) && !subscriptionArr.includes(type)) {
      console.log("Event does not handle:-", type);
      res.status(200).json({
        message: "Event is not handled",
        type
      });
      return;
    }
    if (paymentArr.includes(type)) {
      //add data in paymentLog table
      const createObj = {
        response: event,
        status:
          data.object && data.object.status ? data.object.status : "NO-STATUS",
        userId:
          type === "invoice.paid"
            ? data.object.subscription_details.userId
            : data.object.metadata.userId,

        event: type,
      };
      const log = await PaymentLog.create(createObj);
      res.status(200).json(log);
      return;
    }
    const subData = data.object;
    if (type === "customer.subscription.created") {
      const sub = await handleCreateSubscription(subData, subData.status);
      res.status(200).json(sub);
      return;
    }
    const sub = await Subscription.findOne({
      subscriptionId: subData.id,
      subscriptionStatus: "incomplete",
    });
    if (subData.cancel_at_period_end) {
      res.status(200).json({
        message: "Subscription is being cancelled."
      });
      return;
    }
    const updatedSub = !sub ? await handleCreateSubscription(subData, "renewal") : await Subscription.updateOne(
      { _id: sub._id },
      {
        subscriptionStatus: "active",
        subscriptionType: "new",
      }
    );

    res.status(200).send(updatedSub);
  } catch (err) {
    console.log("error in ", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
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
  const sub = await Subscription.findOne({
    $and: [
      { userId: req.user._id },
      { subscriptionId: subscriptionId },
      {
        $or: [
          { subscriptionStatus: "active" },
          { subscriptionStatus: "trialing" },
        ],
      },
      { endDate: { $gte: new Date() } },
    ],
  });
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

// @desc:     handle get product
// @route:    /api/subscription/product
// @access:   Private
const getProduct = asyncHandler(async (req, res) => {
  const products = await stripe.products.list({ expand: ["data.prices"] });
  const product = await Promise.all(
    products.data.map(async (pro) => {
      const price = await stripe.prices.list({
        product: pro.id,
      });
      return {
        ...pro,
        price: price.data,
      };
    })
  );

  res.status(200).json(product);
});

// @desc:     get current subscription
// @route:    /api/subscription
// @access:   Private
const getCurrentSubscription = asyncHandler(async (req, res) => {
  let subscription = {};

  const sub = await Subscription.findOne({
    $and: [
      { userId: req.user._id },
      {
        $or: [
          { subscriptionStatus: "active" },
          { subscriptionStatus: "trialing" },
        ],
      },
      { endDate: { $gte: new Date() } },
    ],
  });

  const userJob = await Job.count({ user: req.user._id });
  if (sub) {
    const stripeSub = await stripe.subscriptions.retrieve(sub.subscriptionId);
    const product = await stripe.products.retrieve(stripeSub.plan.product);
    const price = await stripe.prices.list({
      product: product.id,
    });

    if (price.data.length > 0 && product) {
      subscription = {
        id: stripeSub.id,
        cancel_at_period_end: stripeSub.cancel_at_period_end,
        current_period_end: stripeSub.current_period_end,
        current_period_start: stripeSub.current_period_start,
        status: stripeSub.status,
        allowJob: true,
        product: {
          name: product.name,
          description: product.description,
          images: product.images,
          amount: price.data[0].unit_amount,
          interval: price.data[0].recurring.interval,
        },
      };
    }
  } else {
    subscription.allowJob = userJob < 2;
  }

  // Get the user object and send it back
  res.status(200).json(subscription);
});

module.exports = {
  createCheckoutSession,
  webHook,
  cancelSubscription,
  getProduct,
  getCurrentSubscription,
};
