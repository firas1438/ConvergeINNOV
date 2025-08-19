import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FAQ from "@/models/faq";

// GET /api/faqs
export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find();
    return NextResponse.json(faqs);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

// POST /api/faqs
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newFaq = await FAQ.create(body);
    return NextResponse.json(newFaq, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
