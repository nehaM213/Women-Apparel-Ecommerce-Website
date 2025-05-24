// app/api/send-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateOtp, saveOtp } from '@/utils/otp';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { identifier } = body;

  if (!identifier) {
    return NextResponse.json({ error: 'Identifier required' }, { status: 400 });
  }

  const otp = generateOtp();
  await saveOtp(identifier, otp);

  console.log(`OTP for ${identifier}: ${otp}`);

  return NextResponse.json({ message: 'OTP sent' }, { status: 200 });
}
