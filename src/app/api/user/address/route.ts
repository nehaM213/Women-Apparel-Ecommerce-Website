import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import User from '@/models/User';
import { connectToMongoDb } from '@/lib/db';
import { addressSchema } from "@/schemas/addressSchema";

export async function POST(req: Request) {
  await connectToMongoDb();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  // If default is true, unset default on all other addresses

  const result = addressSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0].message },
      { status: 400 }
    );
  }

  const validatedData = result.data;

  if (validatedData.default) {
    await User.updateOne(
      { email: session.user.email },
      { $set: { 'addresses.$[].default': false } }
    );
  }
  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { $push: { addresses: validatedData } },
    { new: true, select: 'addresses' }
  );
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, addresses: user.addresses });
}

export async function PUT(req: Request) {
  await connectToMongoDb();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();

  const result = addressSchema.safeParse(body);
  // console.log("body", body._id);
  // console.log("result", result);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.errors[0].message },
      { status: 400 }
    );
  }

  const validatedData = result.data;
  if (!validatedData._id) {
    return NextResponse.json({ error: 'Address ID required' }, { status: 400 });
  }
  // If default is true, unset default on all other addresses
  if (validatedData.default) {
    await User.updateOne(
      { email: session.user.email },
      { $set: { 'addresses.$[].default': false } }
    );
  }
  const user = await User.findOneAndUpdate(
    { email: session.user.email, 'addresses._id': validatedData._id },
    {
      $set: { 'addresses.$': validatedData }
    },
    { new: true, select: 'addresses' }
  );
  if (!user) {
    return NextResponse.json({ error: 'User or address not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, addresses: user.addresses });
}

export async function GET(req: Request) {
  await connectToMongoDb();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email }).select('addresses');
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, addresses: user.addresses });
} 