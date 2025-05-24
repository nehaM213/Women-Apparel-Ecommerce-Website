// app/api/send-email/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY); // use .env.local

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // must be verified on Resend
      to: body.to,
      subject: body.subject,
      html: body.html,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
