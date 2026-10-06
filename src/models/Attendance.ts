import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAttendanceDocument extends Document {
  targetType: "student" | "staff";
  targetId: string;
  studentName?: string;
  classId?: string;
  sectionId?: string;
  date: string; // YYYY-MM-DD
  status: "present" | "absent" | "late" | "excused";
  remarks?: string;
  recordedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendanceDocument>(
  {
    targetType: { type: String, enum: ["student", "staff"], default: "student", required: true },
    targetId: { type: String, required: true, index: true },
    studentName: { type: String },
    classId: { type: String, index: true },
    sectionId: { type: String },
    date: { type: String, required: true, index: true }, // Format: YYYY-MM-DD
    status: { type: String, enum: ["present", "absent", "late", "excused"], required: true },
    remarks: { type: String },
    recordedBy: { type: String },
  },
  { timestamps: true }
);

// Prevent duplicate attendance entries for same person and date
AttendanceSchema.index({ targetType: 1, targetId: 1, date: 1 }, { unique: true });

export const AttendanceModel: Model<IAttendanceDocument> =
  mongoose.models.Attendance || mongoose.model<IAttendanceDocument>("Attendance", AttendanceSchema);
