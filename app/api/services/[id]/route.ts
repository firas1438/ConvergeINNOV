import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Service from "@/models/service";
import path from "path";
import fs from "fs/promises";

// PUT /api/services/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();

    const service = await Service.findById(params.id);
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    // Delete old image if changed
    if (body.imageUrl && body.imageUrl !== service.imageUrl && service.imageUrl?.startsWith("/uploads/")) {
      const oldFile = path.join(process.cwd(), "public", service.imageUrl);
      try { await fs.unlink(oldFile); console.log("Deleted old image:", oldFile); } 
      catch { console.warn("Old image not found:", oldFile); }
    }

    const updated = await Service.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/services/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const service = await Service.findById(params.id);
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    await Service.findByIdAndDelete(params.id);

    if (service.imageUrl?.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", service.imageUrl);
      try { await fs.unlink(filePath); console.log("Deleted file:", filePath); } 
      catch { console.warn("File already removed or not found:", filePath); }
    }

    return NextResponse.json({ message: "Service deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
