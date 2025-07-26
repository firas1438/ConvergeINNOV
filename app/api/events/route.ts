import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/event";

// GET events + number of upcoming events
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find();
    // Current date at midnight (start of today)
    const today = new Date(); today.setHours(0, 0, 0, 0);
    // Filter events with date strictly after today
    const upcomingCount = events.filter(event => { 
      const eventDate = new Date(event.date);
      return eventDate > today;
    }).length;

    return NextResponse.json({ events, upcomingCount });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// POST new event
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const created = await Event.create(body);
    return NextResponse.json(created);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}