"use server";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import Registration from "@/models/registration";


interface UserAccount { name: string; email: string; password: string; }

export const register = async (values: UserAccount) => {
  const { name, email, password } = values;

  try {
    await connectDB();
    // Check if there's already an active user
    const existingUser = await User.findOne({ email });
    if (existingUser) { return { error: "This email is already registered!" };}

    // Check if there's a pending registration
    const existingRequest = await Registration.findOne({ email, status: "pending" });
    if (existingRequest) { return { error: "A registration request with this email is already pending!" }; }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new registration request
    const registration = new Registration({ name, email, password: hashedPassword, status: "pending",});

    // save to DB
    const savedRequest = await registration.save();
    return { success: true, requestId: savedRequest._id.toString() };

  } catch (e) {
    console.error("Registration error: ", e);
    return { error: "Something went wrong. Please try again." };
  }
};
