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
    // await connectToMongoDb();
    // const { orderId } = await req.json();
    // const order = await GuestOrder.findById(orderId);
    // if (!order) {
    //     return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    // }

    const totalAmount = 100;
    try {
        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100), // amount in paise
            currency: 'INR',
            receipt: "receipt_" + Math.random().toString(36).substring(7),
            // notes: {
            //     email: order.email,
            //     orderId: order._id.toString(),
            // },
        });

        return NextResponse.json({ id: razorpayOrder.id }, { status: 200 });
    } catch (error) {
        console.error('Razorpay Order Creation Error:', error);
        return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
    }

}