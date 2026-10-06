import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmissionDocument extends Document {
  applicationNo: string;
  appliedClass: string;
  session: string;
  childName: string;
  childNameBn?: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup?: string;
  previousSchool?: string;
  fatherName: string;
  fatherPhone: string;
  fatherOccupation?: string;
  motherName: string;
  motherPhone?: string;
  motherOccupation?: string;
  presentAddress: string;
  permanentAddress?: string;
  email: string;
  birthCertificateUrl?: string;
  childPhotoUrl?: string;
  status: "submitted" | "under_review" | "approved" | "rejected" | "enrolled";
  reviewNotes?: string;
  submittedAt: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionSchema = new Schema<IAdmissionDocument>(
  {
    applicationNo: { type: String, required: true, unique: true, index: true },
    appliedClass: { type: String, required: true },
    session: { type: String, required: true },
    childName: { type: String, required: true },
    childNameBn: { type: String },
    dob: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodGroup: { type: String },
    previousSchool: { type: String },
    fatherName: { type: String, required: true },
    fatherPhone: { type: String, required: true, index: true },
    fatherOccupation: { type: String },
    motherName: { type: String, required: true },
    motherPhone: { type: String },
    motherOccupation: { type: String },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String },
    email: { type: String, required: true },
    birthCertificateUrl: { type: String },
    childPhotoUrl: { type: String },
    status: {
      type: String,
      enum: ["submitted", "under_review", "approved", "rejected", "enrolled"],
      default: "submitted",
      index: true,
    },
    reviewNotes: { type: String },
    submittedAt: { type: String, required: true },
  },
  { timestamps: true }
);

export const AdmissionModel: Model<IAdmissionDocument> =
  mongoose.models.Admission || mongoose.model<IAdmissionDocument>("Admission", AdmissionSchema);
