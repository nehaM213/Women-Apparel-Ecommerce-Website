import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { connectToMongoDb } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await connectToMongoDb();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user._doc;
    return NextResponse.json(userWithoutPassword);
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
