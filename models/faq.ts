import mongoose, { Schema, model } from "mongoose";

export interface FAQDocument {
  question: string;
  answer: string;
}

const FAQSchema = new Schema<FAQDocument>(
  {
    question: { type: String, required: [true, "FAQ question is required"],},
    answer: { type: String, required: [true, "FAQ answer is required"],},
  },
  {
    timestamps: true, 
  }
);


const FAQ = mongoose.models.FAQ || model<FAQDocument>("FAQ", FAQSchema);

export default FAQ;
