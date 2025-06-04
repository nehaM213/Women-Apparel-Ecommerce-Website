import { signJwt } from '@/lib/jwt';
import { createUser, getUserByIdentifier } from '@/lib/users';
import { verifyOtp, deleteOtp } from '@/utils/otp';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { identifier, otp } = body;
  console.log("identifier", identifier);
  console.log("otp",otp);

  if (!identifier || !otp) {
    console.log("missing");
    return NextResponse.json({ error: 'Identifier and OTP are required' }, { status: 400 });
  }

  const isValid = await verifyOtp(identifier, otp);
  if (!isValid) {
    console.log("no valid");
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }

  let user = await getUserByIdentifier(identifier);
  if (!user) {
    console.log("creating user");
    user = await createUser(identifier);
  }

  await deleteOtp(identifier);

  const token = signJwt({ identifier });

  const response = NextResponse.json({ message: "Logged in",user });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });
  // return NextResponse.json({ token, user }, { status: 200 });
  return response;
}
