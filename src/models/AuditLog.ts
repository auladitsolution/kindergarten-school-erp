import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditLogDocument extends Document {
  userId?: string;
  userName?: string;
  userRole?: string;
  action: string;
  module: string;
  details: string;
  ipAddress?: string;
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLogDocument>(
  {
    userId: { type: String, index: true },
    userName: { type: String },
    userRole: { type: String },
    action: { type: String, required: true },
    module: { type: String, required: true, index: true },
    details: { type: String, required: true },
    ipAddress: { type: String },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

export const AuditLogModel: Model<IAuditLogDocument> =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLogDocument>("AuditLog", AuditLogSchema);
