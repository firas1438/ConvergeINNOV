import { NextResponse } from "next/server";
import Registration from "@/models/registration";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    const request = await Registration.findById(id);
    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (request.status !== "pending") {
      return NextResponse.json({ error: "Request already processed" }, { status: 400 });
    }

    // Update status to declined
    request.status = "declined";
    await request.save();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
