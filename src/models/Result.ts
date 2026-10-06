import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResultDocument extends Document {
  examId: string;
  studentId: string;
  studentName?: string;
  classId: string;
  sectionId: string;
  rollNo?: number;
  subjectMarks: {
    subjectId: string;
    subjectName: string;
    marksObtained?: number;
    highestMarks?: number;
    grade?: string;
    skillRatings?: {
      skillName: string;
      rating: "Needs Work" | "Good" | "Excellent" | "Star";
    }[];
  }[];
  totalMarks?: number;
  averageMarks?: number;
  overallGrade?: string;
  teacherRemarks?: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema = new Schema<IResultDocument>(
  {
    examId: { type: String, required: true, index: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String },
    classId: { type: String, required: true, index: true },
    sectionId: { type: String, required: true },
    rollNo: { type: Number },
    subjectMarks: [
      {
        subjectId: { type: String, required: true },
        subjectName: { type: String, required: true },
        marksObtained: { type: Number },
        highestMarks: { type: Number },
        grade: { type: String },
        skillRatings: [
          {
            skillName: { type: String },
            rating: { type: String, enum: ["Needs Work", "Good", "Excellent", "Star"] },
          },
        ],
      },
    ],
    totalMarks: { type: Number },
    averageMarks: { type: Number },
    overallGrade: { type: String },
    teacherRemarks: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

ResultSchema.index({ examId: 1, studentId: 1 }, { unique: true });

export const ResultModel: Model<IResultDocument> =
  mongoose.models.Result || mongoose.model<IResultDocument>("Result", ResultSchema);
