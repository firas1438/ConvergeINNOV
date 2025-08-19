import mongoose, { Schema, model } from "mongoose";

export interface ContactDocument extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
}


const ContactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: [true, "Contact name is required"] },
    email: { type: String, required: [true, "Contact email is required"] },
    phone: { type: String,required: [true, "Contact phone is required"] },
    subject: { type: String, required: [true, "Contact subject is required"] },
    message: { type: String, required: [true, "Contact message is required"] },
    read: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);



const Contact = mongoose.models?.Contact || model<ContactDocument>("Contact", ContactSchema);

export default Contact;
