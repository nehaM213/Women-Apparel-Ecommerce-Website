import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import User from '@/models/User';
import { connectToMongoDb } from '@/lib/db';

export async function POST(req: Request) {
  await connectToMongoDb();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  // If default is true, unset default on all other addresses
  if (body.default) {
    await User.updateOne(
      { email: session.user.email },
      { $set: { 'addresses.$[].default': false } }
    );
  }
  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { $push: { addresses: body } },
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
  if (!body._id) {
    return NextResponse.json({ error: 'Address ID required' }, { status: 400 });
  }
  // If default is true, unset default on all other addresses
  if (body.default) {
    await User.updateOne(
      { email: session.user.email },
      { $set: { 'addresses.$[].default': false } }
    );
  }
  const user = await User.findOneAndUpdate(
    { email: session.user.email, 'addresses._id': body._id },
    {
      $set: {
        'addresses.$.firstName': body.firstName,
        'addresses.$.lastName': body.lastName,
        'addresses.$.addressLine1': body.addressLine1,
        'addresses.$.addressLine2': body.addressLine2,
        'addresses.$.company': body.company,
        'addresses.$.postalCode': body.postalCode,
        'addresses.$.contactNumber': body.contactNumber,
        'addresses.$.city': body.city,
        'addresses.$.country': body.country,
        'addresses.$.default': !!body.default,
      },
    },
    { new: true, select: 'addresses' }
  );
  if (!user) {
    return NextResponse.json({ error: 'User or address not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, addresses: user.addresses });
} 