import mongoose, { Schema, model } from  "mongoose";

export interface UserDocument {
  name: string;
  email: string;
  password: string;
  role?: string;
}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: [true, "Name is required"]},
    email: { type: String, unique: true, required: [true, "Email is required"], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is invalid",], },
    password: { type: String, required: [true, "Password is required"] },
    role: { type: String, default: "Admin"},
  },
  { timestamps: true }
);

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);
export  default  User;