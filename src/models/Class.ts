import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClassDocument extends Document {
  name: string;
  nameBn?: string;
  code: string;
  level: number;
  description?: string;
  sections: {
    name: string;
    capacity: number;
    classTeacherId?: string;
    classTeacherName?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema = new Schema<IClassDocument>(
  {
    name: { type: String, required: true, unique: true },
    nameBn: { type: String },
    code: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    description: { type: String },
    sections: [
      {
        name: { type: String, required: true },
        capacity: { type: Number, default: 25 },
        classTeacherId: { type: String },
        classTeacherName: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const ClassModel: Model<IClassDocument> =
  mongoose.models.Class || mongoose.model<IClassDocument>("Class", ClassSchema);
