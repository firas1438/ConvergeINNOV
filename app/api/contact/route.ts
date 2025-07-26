import Contact from "@/models/contact";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// POST method (contact form submission)
export async function POST(request: NextRequest) {
    await connectDB();
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    try {
        const newContact = new Contact({ name, email, phone, subject, message,});
        await newContact.save();
        return NextResponse.json({ message: "Contact submitted successfully." }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}

// GET method (fetch contact data)
export async function GET(request: NextRequest) {
  await connectDB();

  try {
    // fetch all contacts, sorted by newest first
    const contacts = await Contact.find().sort({ createdAt: -1 });

    // get the count of unread tickets (where read: false)
    const unreadCount = await Contact.countDocuments({ read: false });

    return NextResponse.json({ contacts, unreadCount }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

// PATCH method (mark ticket as read)
export async function PATCH(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const { id, read } = body;

  if (!id || typeof read !== "boolean") {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate( id, { read }, { new: true } );
    return NextResponse.json({ message: "Ticket status updated", contact: updatedContact });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 });
  }
}
