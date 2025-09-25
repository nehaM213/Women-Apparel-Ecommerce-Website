import { NextResponse } from 'next/server';
import { connectToMongoDb } from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple Order schema for guest orders
const GuestOrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: String,
  firstName: String,
  lastName: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  postalCode: String,
  country: String,
  createAccount: Boolean,
  cart: { type: Array, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const GuestOrder = mongoose.models.GuestOrder || mongoose.model('GuestOrder', GuestOrderSchema);

export async function POST(req: Request) {
  await connectToMongoDb();
  const body = await req.json();
  // Validate required fields
  if (!body.email || !body.firstName || !body.lastName || !body.addressLine1 || !body.city || !body.postalCode || !body.country || !body.cart) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  // Save order
  const order = await GuestOrder.create({
    email: body.email,
    phone: body.phone,
    firstName: body.firstName,
    lastName: body.lastName,
    addressLine1: body.addressLine1,
    addressLine2: body.addressLine2,
    city: body.city,
    postalCode: body.postalCode,
    country: body.country,
    createAccount: !!body.createAccount,
    cart: body.cart,
    status: 'pending',
  });
  return NextResponse.json({ success: true, orderId: order._id, order });
} 