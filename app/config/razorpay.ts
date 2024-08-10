import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID ?? "rzp_test_XymAEFb8u1qGoE",
  key_secret: process.env.RAZORPAY_KEY ?? "cFWBQ8RA7qYWvGFrMyAX40tU",
});
