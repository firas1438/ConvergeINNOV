import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

// DELETE /api/users/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    // Find the user first
    const user = await User.findById(params.id);
    if (!user) { return NextResponse.json({ error: "User not found" }, { status: 404 });}
    // Prevent deleting Super admins
    if (user.role === "Super") { return NextResponse.json({ error: "Super admins cannot be deleted" }, { status: 403 }); }
    // Delete admin
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Admin deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
  }
}
