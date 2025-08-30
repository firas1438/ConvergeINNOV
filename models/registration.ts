import mongoose, { Schema, model } from "mongoose";

export interface RegistrationDocument {
  name: string;
  email: string;
  password: string; 
  status: "pending" | "approved" | "declined";
}

const RegistrationSchema = new Schema<RegistrationDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "declined"], default: "pending" },
  },
  { timestamps: true }
);

const Registration = mongoose.models.Registration || model<RegistrationDocument>("Registration", RegistrationSchema);

export default Registration;
