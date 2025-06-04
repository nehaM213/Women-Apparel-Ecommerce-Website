// app/api/send-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateOtp, saveOtp } from '@/utils/otp';
import { resend } from '@/lib/resend';
import { OtpEmail } from '@/components/emailTemplates/OtpEmail';
import { twilioClient } from '@/lib/twilio';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { identifier, isMobile } = body;

  if (!identifier) {
    return NextResponse.json({ error: 'Identifier required' }, { status: 400 });
  }

  const otp = generateOtp();

  try {
    if(isMobile){
      await twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER!,
        to: identifier,
      });
    }
    else{
      await resend.emails.send({
        from: 'LazuliByNeha <onboarding@resend.dev>',
        to: identifier,
        subject: 'Your OTP Code',
        react: OtpEmail({ otp }),
      });
    }
    console.log(`OTP for ${identifier}: ${otp}`);
    await saveOtp(identifier, otp);
    return NextResponse.json({ message: 'OTP sent' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send OTP',error }, { status: 500 });
  }
}
