import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/service";

// PUT /api/services/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const updated = await Service.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/services/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Service.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Service deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
