import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/db";
import order from "@/lib/models/order";

export async function POST(req: NextRequest) {
  try {
    const { orderId, reason } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    await connectToMongoDb();
    await order.findByIdAndUpdate(orderId, { status: "failed", failureReason: reason });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment failure record error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
