import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/event";
import path from "path";
import fs from "fs/promises";

// PUT /api/events/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    await connectDB();

    const event = await Event.findById(params.id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    // Delete old image if changed
    if (body.image && body.image !== event.image && event.image?.startsWith("/uploads/")) {
      const oldFile = path.join(process.cwd(), "public", event.image);
      try { await fs.unlink(oldFile); console.log("Deleted old image:", oldFile); } 
      catch { console.warn("Old image not found:", oldFile); }
    }

    const updated = await Event.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

// DELETE /api/events/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const event = await Event.findById(params.id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    await Event.findByIdAndDelete(params.id);

    if (event.image?.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", event.image);
      try { await fs.unlink(filePath); console.log("Deleted file:", filePath); } 
      catch { console.warn("File already removed or not found:", filePath); }
    }

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
