import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Partner from "@/models/partner";

// GET method
export async function GET() {
  try {
    await connectDB();
    const partners = await Partner.find();
    return NextResponse.json(partners);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch Partners" }, { status: 500 });
  }
}

// POST method
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const partner = await Partner.create(body);
    return NextResponse.json(partner);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create Partner" }, { status: 500 });
  }
}
