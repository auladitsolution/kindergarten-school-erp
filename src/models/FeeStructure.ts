import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeeStructureDocument extends Document {
  academicYear: string;
  classId: string;
  className?: string;
  feeType: "Admission" | "Tuition" | "Exam" | "Session" | "Transport" | "Activity";
  amount: number;
  frequency: "one_time" | "monthly" | "per_term" | "yearly";
}

const FeeStructureSchema = new Schema<IFeeStructureDocument>(
  {
    academicYear: { type: String, required: true },
    classId: { type: String, required: true },
    className: { type: String },
    feeType: {
      type: String,
      enum: ["Admission", "Tuition", "Exam", "Session", "Transport", "Activity"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    frequency: {
      type: String,
      enum: ["one_time", "monthly", "per_term", "yearly"],
      required: true,
    },
  },
  { timestamps: true }
);

FeeStructureSchema.index({ academicYear: 1, classId: 1, feeType: 1 }, { unique: true });

export const FeeStructureModel: Model<IFeeStructureDocument> =
  mongoose.models.FeeStructure ||
  mongoose.model<IFeeStructureDocument>("FeeStructure", FeeStructureSchema);
