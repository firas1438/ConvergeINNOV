import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/event";

// UPDATE an event by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await connectDB();
    const updated = await Event.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Event not found for update" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

// DELETE an event by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const deleted = await Event.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Event not found for deletion" }, { status: 404 });
    }
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
