import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Partner from "@/models/partner";
import path from "path";
import fs from "fs/promises";


// PUT /api/partners/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();

    // Fetch existing partner from DB
    const partner = await Partner.findById(params.id);
    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    // If imagepath changed and old image exists, delete old file
    if (body.imagepath && body.imagepath !== partner.imagepath && partner.imagepath?.startsWith("/uploads/")) {
      const oldFile = path.join(process.cwd(), "public", partner.imagepath);
      try {
        await fs.unlink(oldFile);
        console.log("Deleted old image:", oldFile);
      } catch (err) {
        console.warn("Old image file not found:", oldFile);
      }
    }

    // Update the partner
    const updated = await Partner.findByIdAndUpdate(params.id, body, { new: true });
    
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
}


// DELETE /api/partners/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Find partner first (so we know its imagepath)
    const partner = await Partner.findById(params.id);

    if (!partner) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    // Delete DB record
    await Partner.findByIdAndDelete(params.id);

    // Delete image file if it exists in /uploads/
    if (partner.imagepath?.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", partner.imagepath);
      try {
        await fs.unlink(filePath);
        console.log("Deleted file:", filePath);
      } catch (err) {
        console.warn("File already removed or not found:", filePath);
      }
    }

    return NextResponse.json({ message: "Partner deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}


