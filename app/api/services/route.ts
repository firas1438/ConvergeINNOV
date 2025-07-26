import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/service";

// GET method
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find();
    return NextResponse.json(services);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch Services" }, { status: 500 });
  }
}

// POST method
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const service = await Service.create(body);
    return NextResponse.json(service);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create Service" }, { status: 500 });
  }
}
