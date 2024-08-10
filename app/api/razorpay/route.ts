import { instance } from "@/app/config/razorpay";
import { NextResponse, NextRequest } from "next/server";
import { Subscriptions } from "razorpay/dist/types/subscriptions";
import shortid from "shortid";
export async function POST(req: any, res: NextResponse) {
  // Create an order -> generate the OrderID -> Send it to the Front-end
  const payment_capture = 1;
  const amount = 499;
  const currency = "INR";
  //   const options = {
  //     amount: (amount * 100).toString(),
  //     currency,
  //     receipt: shortid.generate(),
  //     payment_capture,
  //   };
  const options: Subscriptions.RazorpaySubscriptionCreateRequestBody = {
    plan_id: "plan_OPK0NM3Qqc8tg4",
    total_count: 1,
    customer_notify: true,
    quantity: 1,
  };

  try {
    //   const response = await instance.orders.create(options);
    const response = await instance.subscriptions.create(options);
    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
