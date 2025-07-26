import mongoose, { Schema, model } from "mongoose";

export interface TestimonialDocument {
  rating: number;
  name: string;
  role: string;
  testimonial: string;
}


const TestimonialSchema = new Schema<TestimonialDocument>(
  {
    rating: { type: Number, required: [true, "Rating is required"],},
    name: { type: String, required: [true, "Name is required"],},
    role: { type: String, required: [true, "Role is required"],},
    testimonial: { type: String, required: [true, "Testimonial is required"],},
  },
  {
    timestamps: true, 
  }
);


const Testimonial = mongoose.models?.Testimonial || model<TestimonialDocument>("Testimonial", TestimonialSchema);

export default Testimonial;
