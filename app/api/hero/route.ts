import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Hero from "@/models/hero";

// GET: fetch hero content
export async function GET() {
  try {
    await connectDB();
    const heros = await Hero.find();
    return NextResponse.json(heros);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch hero content" }, { status: 500 });
  }
}

// PATCH: update hero section content
export async function PATCH(req: Request) {
  try {
      await connectDB();
      const { header, description } = await req.json();
      // find and update the first hero document {}
      const updatedHero = await Hero.findOneAndUpdate( {}, { header, description }, { new: true } );
      if (!updatedHero) { return NextResponse.json({ error: "Hero content not found" }, { status: 404 });}
      return NextResponse.json(updatedHero);
  } catch (err) {
      console.error("PATCH error:", err);
      return NextResponse.json({ error: "Failed to update Hero content" }, { status: 500 });
  }
}