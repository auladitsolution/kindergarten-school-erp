import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPaymentDocument extends Document {
  paymentRef: string;
  invoiceId: string;
  invoiceNo?: string;
  studentId: string;
  studentName?: string;
  amount: number;
  paymentMethod: "cash" | "bank" | "bkash" | "nagad";
  transactionRef?: string;
  verifiedBy?: string;
  verifiedByName?: string;
  status: "verified" | "pending" | "rejected";
  paymentDate: string;
  receiptUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPaymentDocument>(
  {
    paymentRef: { type: String, required: true, unique: true, index: true },
    invoiceId: { type: String, required: true, index: true },
    invoiceNo: { type: String },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String },
    amount: { type: Number, required: true, min: 1 },
    paymentMethod: {
      type: String,
      enum: ["cash", "bank", "bkash", "nagad"],
      required: true,
    },
    transactionRef: { type: String },
    verifiedBy: { type: String },
    verifiedByName: { type: String },
    status: {
      type: String,
      enum: ["verified", "pending", "rejected"],
      default: "pending", // Security rule: manual payments must not be auto-verified
      index: true,
    },
    paymentDate: { type: String, required: true },
    receiptUrl: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export const PaymentModel: Model<IPaymentDocument> =
  mongoose.models.Payment || mongoose.model<IPaymentDocument>("Payment", PaymentSchema);
