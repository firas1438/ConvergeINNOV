import mongoose, { Schema, model } from "mongoose";

export interface PartnerDocument {
  name: string;
  description: string;
  imagepath: string;
}

const PartnerSchema = new Schema<PartnerDocument>(
  {
    name: { type: String, required: [true, "Partner name is required"],},
    description: { type: String, required: [true, "Partner description is required"],},
    imagepath: { type: String, required: [true, "Partner logo is required"],},
  },
  {
    timestamps: true, 
  }
);


const Partner = mongoose.models.Partner || model<PartnerDocument>("Partner", PartnerSchema);

export default Partner;


