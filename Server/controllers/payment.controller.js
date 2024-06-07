import AppError from "../utils/error.util.js";
import { razorpay } from "../server.js";
import crypto from "crypto";
import Payment from "../models/payment.schema.js";
import User from "../models/user.model.js";

const getRazorpayApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Razorpay API key",
    key: process.env.RAZORPAY_KEY_ID,
  });
};
const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized, please login"));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase a subscription", 400));
    }

    const planId = process.env.RAZORPAY_PLAN_ID.trim() || "plan_OILDvBiqFjWliB"; // Ensure there are no extra spaces
    console.log(`Using Razorpay Plan ID: ${planId}`);

    let subscription;
    try {
      subscription = await razorpay.subscriptions.create({
        plan_id: planId,
        customer_notify: 1,
        total_count: 12,
      });
    } catch (error) {
      console.error("Razorpay subscription creation error: ", error);
      return next(new AppError("Unable to create subscription", 400));
    }

    if (!subscription) {
      return next(
        new AppError("Subscription creation failed without error", 500)
      );
    }

    console.log(subscription);

    // Adding the ID and the status to the user account
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    // Saving the user object
    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    console.error("Unexpected error: ", error);
    return next(
      new AppError(
        error.message || "An unexpected error occurred",
        error.statusCode || 500
      )
    );
  }
};

const verifySubscription = async (req, res, next) => {
  const { id } = req.user;
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;

  const user = await User.findById(id);
  if (!user) {
    return next(new AppError("Unauthorized, please login", 400));
  }

  const subscriptionId = user.subscription.id;

  // Generating a signature with SHA256 for verification purposes

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest("hex");

  // Check if generated signature and signature received from the frontend is the same or not
  if (generatedSignature !== razorpay_signature) {
    return next(new AppError("Payment not verified, please try again.", 400));
  }

  // If they match create payment and store it in the DB
  await Payment.create({
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature,
  });

  // Update the user subscription status to active (This will be created before this)
  user.subscription.status = "active";

  // Save the user in the DB with any changes
  await user.save();

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
  });
};

// const cancelSubscription = async (req, res, next) => {
//   try {
//     const { id } = req.user;
//     const user = await User.findById(id);

//     if (user.role === "ADMIN") {
//       return next(
//         new AppError("Admin does not need to cannot cancel subscription", 400)
//       );
//     }

//     const subscriptionId = user.subscription.id;
//     console.log(subscriptionId);

//     try {
//       console.log("hii");
//       const subscription = await razorpay.subscriptions.cancel(subscriptionId);
//       user.subscription.status = subscription.status;
//       console.log("hello");
//       await user.save();
//     } catch (error) {
//       return next(
//         new AppError("Unable to cancel Subscription ,please try again", 400)
//       );
//     }

//     const payment = await Payment.findOne({
//       razorpay_subscription_id: subscriptionId,
//     });

//     // Getting the time from the date of successful payment (in milliseconds)
//     const timeSinceSubscribed = Date.now() - payment.createdAt;
//     const refundPeriod = 14 * 24 * 60 * 60 * 1000;

//     // Check if refund period has expired or not
//     if (refundPeriod <= timeSinceSubscribed) {
//       return next(
//         new AppError(
//           "Refund period is over, so there will not be any refunds provided.",
//           400
//         )
//       );
//     }

//     // If refund period is valid then refund the full amount that the user has paid
//     await razorpay.payments.refund(payment.razorpay_payment_id, {
//       speed: "optimum", // This is required
//     });

//     user.subscription.id = undefined; // Remove the subscription ID from user DB
//     user.subscription.status = undefined; // Change the subscription Status in user DB

//     await user.save();
//     await Payment.deleteOne({ id });

//     // Send the response
//     res.status(200).json({
//       success: true,
//       message: "Subscription canceled successfully",
//     });
//   } catch (error) {
//     new AppError(error.message, 401);
//   }
// };
const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (user.role === "ADMIN") {
      return next(
        new AppError("Admin does not need to cancel subscription", 400)
      );
    }

    const subscriptionId = user.subscription.id;
    if (!subscriptionId) {
      return next(new AppError("No subscription found for this user", 400));
    }

    console.log(`Subscription ID to cancel: ${subscriptionId}`);

    try {
      const subscription = await razorpay.subscriptions.cancel(subscriptionId);
      user.subscription.status = subscription.status;
      await user.save();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      return next(
        new AppError("Unable to cancel subscription, please try again", 400)
      );
    }

    const payment = await Payment.findOne({
      razorpay_subscription_id: subscriptionId,
    });

    if (!payment) {
      return next(new AppError("No payment found for this subscription", 400));
    }

    // Calculate time since subscription in milliseconds
    const timeSinceSubscribed =
      Date.now() - new Date(payment.createdAt).getTime();
    const refundPeriod = 14 * 24 * 60 * 60 * 1000;

    // Check if refund period has expired
    if (timeSinceSubscribed > refundPeriod) {
      return next(
        new AppError(
          "Refund period is over, so there will not be any refunds provided.",
          400
        )
      );
    }

    try {
      // Refund the full amount that the user has paid
      await razorpay.payments.refund(payment.razorpay_payment_id, {
        speed: "optimum", // This is required
      });
    } catch (refundError) {
      console.error("Error processing refund:", refundError);
      return next(
        new AppError("Unable to process refund, please try again", 400)
      );
    }

    user.subscription.id = undefined; // Remove the subscription ID from user DB
    user.subscription.status = undefined; // Change the subscription Status in user DB

    await user.save();
    await Payment.deleteOne({ razorpay_subscription_id: subscriptionId });

    // Send the response
    res.status(200).json({
      success: true,
      message: "Subscription canceled successfully",
    });
  } catch (error) {
    console.error("Error in cancelSubscription function:", error);
    next(
      new AppError("An error occurred while cancelling the subscription", 401)
    );
  }
};

const allPayments = async (req, res, next) => {
  console.log(req.query);
  const { count, skip } = req.query;

  // Find all subscriptions from razorpay
  const allSubscriptions = await razorpay.subscriptions.all({
    count: count ? count : 10,
    skip: skip ? skip : 0,
  });

  // Filter active subscriptions
  const activeSubscriptionIds = allSubscriptions.items
    .filter((subscription) => subscription.status === "active")
    .map((subscription) => subscription.id);

  // Find payments associated with active subscriptions
  const allPaymentsResponse = await razorpay.payments.all({
    subscription_id: activeSubscriptionIds,
  });

  const allPayments = allPaymentsResponse.items;

  console.log(allPaymentsResponse.count);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize an object to store payments for each month
  const finalMonths = {};
  monthNames.forEach((month) => {
    finalMonths[month] = 0;
  });

  // Calculate payments for each month
  allPayments.forEach((payment) => {
    const paymentDate = new Date(payment.created_at * 1000);
    const month = monthNames[paymentDate.getMonth()];
    finalMonths[month]++;
  });

  // Convert the monthly payments to an array for response
  const monthlySalesRecord = monthNames.map((month) => finalMonths[month]);

  res.status(200).json({
    success: true,
    message: "All payments for active subscriptions",
    allPayments: allPaymentsResponse,
    finalMonths,
    monthlySalesRecord,
  });
};

export {
  allPayments,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  getRazorpayApiKey,
};
