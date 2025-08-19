import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/testimonial";

// GET method
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find();
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json({ error: "Failed to fetch Testimonials" }, { status: 500 });
  }
}

// POST method
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const created = await Testimonial.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
