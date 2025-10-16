import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToMongoDb } from "@/lib/db";
import order from "@/lib/models/order";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    // 🔑 Verify the signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature, payment verification failed" }, { status: 400 });
    }

    await connectToMongoDb();
    console.log("orderId", orderId);
    // ✅ Update order to paid
    const updatedOrder =await order.findByIdAndUpdate(
          orderId,
          {
            status: "paid",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
          },
          { new: true }
        )
      
    if (!updatedOrder) {
      return NextResponse.json({ error: "Failed to place order" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
