import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import User from '@/models/User';
import { connectToMongoDb } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectToMongoDb();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { password } = await req.json();
  if (!password || password.length < 6 || password.length > 40) {
    return NextResponse.json({ error: 'Password must be between 6 and 40 characters.' }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: { password: hashedPassword } },
    { new: true }
  );
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
} 