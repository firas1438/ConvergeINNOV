// ./app/api/contact/unreadCount/route.ts
import Contact from "@/models/contact";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const unreadCount = await Contact.countDocuments({ read: false });
    return NextResponse.json({ unreadCount }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch unread tickets count" }, { status: 500 });
  }
}
