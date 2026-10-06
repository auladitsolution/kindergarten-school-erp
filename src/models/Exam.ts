import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExamDocument extends Document {
  academicYear: string;
  title: string;
  term: "First Term" | "Mid Term" | "Final Term" | "Monthly Test";
  startDate: string;
  endDate: string;
  isPublished: boolean;
}

const ExamSchema = new Schema<IExamDocument>(
  {
    academicYear: { type: String, required: true },
    title: { type: String, required: true },
    term: {
      type: String,
      enum: ["First Term", "Mid Term", "Final Term", "Monthly Test"],
      required: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ExamModel: Model<IExamDocument> =
  mongoose.models.Exam || mongoose.model<IExamDocument>("Exam", ExamSchema);
