import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeacherDocument extends Document {
  userId?: string;
  employeeId: string;
  name: string;
  nameBn?: string;
  designation: string;
  qualification: string;
  joiningDate: string;
  phone: string;
  email: string;
  assignedClasses: string[];
  assignedSubjects: string[];
  salary?: number;
  photoUrl?: string;
  bio?: string;
  isClassTeacher?: boolean;
  classTeacherOf?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema = new Schema<ITeacherDocument>(
  {
    userId: { type: String, index: true },
    employeeId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    nameBn: { type: String },
    designation: { type: String, required: true },
    qualification: { type: String, required: true },
    joiningDate: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    assignedClasses: [{ type: String }],
    assignedSubjects: [{ type: String }],
    salary: { type: Number },
    photoUrl: { type: String },
    bio: { type: String },
    isClassTeacher: { type: Boolean, default: false },
    classTeacherOf: { type: String },
  },
  { timestamps: true }
);

export const TeacherModel: Model<ITeacherDocument> =
  mongoose.models.Teacher || mongoose.model<ITeacherDocument>("Teacher", TeacherSchema);
