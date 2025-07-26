import mongoose, { Schema, model } from "mongoose";

export interface HeroDocument {
  header: string;
  description: string;
}

const HeroSchema = new Schema<HeroDocument>(
  {
    header: {
      type: String,
      required: [true, "Header is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true, 
  }
);


const Hero = mongoose.models?.Hero || model<HeroDocument>("Hero", HeroSchema);

export default Hero;
