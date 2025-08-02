import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

// GET request to fetch admin list
export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select("-password"); // All users, no password
    const count = await User.countDocuments(); // total user count

    return NextResponse.json({ count, users });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
