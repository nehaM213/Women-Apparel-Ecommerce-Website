import bcrypt, { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToMongoDb } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    await connectToMongoDb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
