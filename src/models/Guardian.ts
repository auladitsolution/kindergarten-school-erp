import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGuardianDocument extends Document {
  userId?: string;
  name: string;
  nameBn?: string;
  relation: "Father" | "Mother" | "Legal Guardian" | "Other";
  phone: string;
  email?: string;
  nid?: string;
  profession?: string;
  address: string;
  linkedStudentIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const GuardianSchema = new Schema<IGuardianDocument>(
  {
    userId: { type: String, index: true },
    name: { type: String, required: true },
    nameBn: { type: String },
    relation: { type: String, enum: ["Father", "Mother", "Legal Guardian", "Other"], required: true },
    phone: { type: String, required: true, index: true },
    email: { type: String },
    nid: { type: String },
    profession: { type: String },
    address: { type: String, required: true },
    linkedStudentIds: [{ type: String }],
  },
  { timestamps: true }
);

export const GuardianModel: Model<IGuardianDocument> =
  mongoose.models.Guardian || mongoose.model<IGuardianDocument>("Guardian", GuardianSchema);
