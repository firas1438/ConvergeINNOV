import mongoose, { Schema, model } from "mongoose";

export interface ServiceDocument {
  category: string;
  title: string;
  imageUrl: string;
  description: string;
}


const ServiceSchema = new Schema<ServiceDocument>(
  {
    category: { type: String, required: [true, "Category name is required"],},
    title: { type: String, required: [true, "Title is required"],},
    imageUrl: { type: String, required: [true, "Image URL is required"],},
    description: { type: String, required: [true, "Description is required"],},
  },
  {
    timestamps: true, 
  }
);


const Service = mongoose.models?.Service || model<ServiceDocument>("Service", ServiceSchema);

export default Service;
