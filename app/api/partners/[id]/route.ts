import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Partner from "@/models/partner";

// PUT /api/partners/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const updated = await Partner.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
}

// DELETE /api/partners/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Partner.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Partner deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}
