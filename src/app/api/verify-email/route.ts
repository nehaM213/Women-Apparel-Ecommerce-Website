import { connectToMongoDb } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      // Connect to MongoDB
      await connectToMongoDb();
  
      const { searchParams } = new URL(req.url);
      const token = searchParams.get("token");
  
      if (!token) {
        return NextResponse.json({ success: false, message: "No token provided" }, { status: 400 });
      }
  
      // Find user with matching token AND token not expired
      const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gte: new Date() },
      });
  
      if (!user) {
        return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 400 });
      }
  
      // Mark email as verified and clear token fields
      user.emailVerified = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
  
      await user.save();
  
      return NextResponse.json({ success: true, message: "Email verified successfully" });
    } catch (error) {
      console.error("Email verification error:", error);
      return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
  }
  