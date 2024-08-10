import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "User" | "Admin";
  deletedAt?: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;
