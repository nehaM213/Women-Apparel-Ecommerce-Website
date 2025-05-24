import bcrypt, { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendEmail } from "@/lib/api/sendEmail";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 1000 * 60 * 60; // 1 hour

  try {
    await connectToMongoDb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, verifyToken: token, verifyTokenExpiry: expiry });

    const link = `${process.env.NEXTAUTH_URL}/verify-email?token=${newUser.emailVerificationToken}`;

    await sendEmail({
      to: email,
      subject: 'Verify your email',
      html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
