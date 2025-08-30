import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/registration";

// GET /api/registrations
export async function GET() {
  try {
    await connectDB();
    const registrations = await Registration.find().sort({ status: -1, createdAt: -1 });
    return NextResponse.json(registrations);
  } catch (err) {
    return NextResponse.json( { error: "Failed to fetch Registration requests" }, { status: 500 } );
  }
}