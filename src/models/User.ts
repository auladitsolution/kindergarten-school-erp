import mongoose, { Schema, Document, Model } from "mongoose";
import { UserRole, UserStatus } from "@/types";

export interface IUserDocument extends Document {
  firebaseUid: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  avatar?: string;
  linkedEntityId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["super_admin", "school_admin", "principal", "teacher", "accountant", "parent", "student"],
      default: "parent",
    },
    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending", // Strict rule: new accounts receive restricted pending status
    },
    phone: { type: String },
    avatar: { type: String },
    linkedEntityId: { type: String },
  },
  { timestamps: true }
);

export const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
