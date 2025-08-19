import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import About from "@/models/about";

// GET: fetch data
export async function GET() {
  try {
    await connectDB();
    // only get the first document
    const aboutData = await About.findOne();

    if (!aboutData) {
      return NextResponse.json({ error: "About data not found" }, { status: 404 });
    }

    return NextResponse.json(aboutData);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch About data" }, { status: 500 });
  }
}

// PATCH: update data
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const updated = await About.findOneAndUpdate({}, { intro: body.intro, missions: body.missions, metrics: body.metrics,}, { new: true, upsert: true,});
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update About data" }, { status: 500 });
  }
}
