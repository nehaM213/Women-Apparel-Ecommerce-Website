import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectToMongoDb } from '@/lib/db';
import mongoose from 'mongoose';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// const GuestOrder = mongoose.models.GuestOrder || mongoose.model('GuestOrder');

export async function POST(req: Request) {
    await connectToMongoDb();
    const { amount, orderId } = await req.json();
    try {
        const razorpayOrder = await razorpay.orders.create({
            amount: amount, // amount in paise
            currency: 'INR',
            receipt: "receipt_" + Math.random().toString(36).substring(7),
            // notes: {
            //     email: order.email,
            //     orderId: order._id.toString(),
            // },
        });

        // If an orderId is provided, persist the Razorpay order id on it
        if (orderId) {
            const Order = (await import('@/lib/models/order')).default;
            await Order.findByIdAndUpdate(orderId, { razorpayOrderId: razorpayOrder.id });
        }

        return NextResponse.json({ id: razorpayOrder.id }, { status: 200 });
    } catch (error) {
        console.error('Razorpay Order Creation Error:', error);
        return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
    }

}