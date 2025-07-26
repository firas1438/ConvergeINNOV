import mongoose, { Schema, model } from "mongoose";

export interface Mission { title: string; mission: string; }

export interface Metric { metric: string; description: string; }

export interface AboutDocument {
  intro: string;
  missions: Mission[];
  metrics: Metric[];
}

const MissionSchema = new Schema<Mission>(
  {
    title: { type: String, required: [true, "Mission title is required"] },
    mission: { type: String, required: [true, "Mission description is required"] },
  },
  { _id: false } 
);

const MetricSchema = new Schema<Metric>(
  {
    metric: { type: String, required: [true, "Metric value is required"] },
    description: { type: String, required: [true, "Metric description is required"] },
  }, { _id: false }
);

// about schema
const AboutSchema = new Schema<AboutDocument>(
  {
    intro: { type: String, required: [true, "Intro text is required"] },
    missions: { type: [MissionSchema], required: true },
    metrics: { type: [MetricSchema], required: true },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.models?.About || model<AboutDocument>("About", AboutSchema);

export default About;
