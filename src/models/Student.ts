import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudentDocument extends Document {
  studentId: string;
  admissionNo: string;
  name: string;
  nameBn?: string;
  classId: string;
  className?: string;
  sectionId: string;
  sectionName?: string;
  rollNo: number;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup?: string;
  religion?: string;
  address: string;
  photoUrl?: string;
  guardianId: string;
  guardianName?: string;
  guardianPhone?: string;
  admissionDate: string;
  academicYear: string;
  enrollmentStatus: "active" | "alumni" | "withdrawn";
  emergencyContact: string;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudentDocument>(
  {
    studentId: { type: String, required: true, unique: true, index: true },
    admissionNo: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    nameBn: { type: String },
    classId: { type: String, required: true, index: true },
    className: { type: String },
    sectionId: { type: String, required: true },
    sectionName: { type: String },
    rollNo: { type: Number, required: true },
    dob: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodGroup: { type: String },
    religion: { type: String },
    address: { type: String, required: true },
    photoUrl: { type: String },
    guardianId: { type: String, required: true, index: true },
    guardianName: { type: String },
    guardianPhone: { type: String },
    admissionDate: { type: String, required: true },
    academicYear: { type: String, required: true, index: true },
    enrollmentStatus: {
      type: String,
      enum: ["active", "alumni", "withdrawn"],
      default: "active",
      index: true,
    },
    emergencyContact: { type: String, required: true },
    remarks: { type: String },
  },
  { timestamps: true }
);

StudentSchema.index({ classId: 1, sectionId: 1, rollNo: 1 });

export const StudentModel: Model<IStudentDocument> =
  mongoose.models.Student || mongoose.model<IStudentDocument>("Student", StudentSchema);
