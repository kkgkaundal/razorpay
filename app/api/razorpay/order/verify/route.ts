import { NextResponse } from "next/server";
import crypto from "crypto";
// import Order from "@/models/OrderModel";
// import { connectDB } from "@/lib/mongodb";

export async function POST(req: any, res: any) {
  const { razorpayOrderId, razorpaySignature, razorpayPaymentId, email } =
    await req.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY ?? "")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic) {
    return NextResponse.json(
      { message: "invalid payment signature", error: true },
      { status: 400 }
    );
  }

  // connect db and update data
  //   await connectDB();
  //   await Order.findOneAndUpdate({ email: email }, { hasPaid: true });

  return NextResponse.json(
    { message: "payment success", error: false },
    { status: 200 }
  );
}
