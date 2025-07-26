import mongoose, { Schema, model } from "mongoose";

export interface EventDocument {
  title: string;
  date: Date;
  location: string;
  image: string;
  description: string;
}


const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: [true, "Event title is required"],},
    date: { type: Date, required: [true, "Event date is required"],},
    location: { type: String, required: [true, "Event location is required"],},
    image: { type: String, required: [true, "Image URL is required"],},
    description: { type: String, required: [true, "Event description is required"],},
  },
  {
    timestamps: true, 
  }
);


const Event = mongoose.models?.Event || model<EventDocument>("Event", EventSchema);

export default Event;
