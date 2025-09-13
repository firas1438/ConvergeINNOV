import { NextResponse } from "next/server";
import Registration from "@/models/registration";
import User from "@/models/user";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    const request = await Registration.findById(id);
    if (!request) return NextResponse.json({ error: "Request not found" }, { status: 404 });
    if (request.status !== "pending") return NextResponse.json({ error: "Request already processed" }, { status: 400 });

    // Create the user
    await User.create({
      name: request.name,
      email: request.email,
      password: request.password, 
    });

    request.status = "approved";
    await request.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to approve registration" }, { status: 500 });
  }
}
