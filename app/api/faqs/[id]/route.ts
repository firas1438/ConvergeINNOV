import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FAQ from "@/models/faq";

// PUT /api/faqs/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const updated = await FAQ.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

// DELETE /api/faqs/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await FAQ.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "FAQ deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
