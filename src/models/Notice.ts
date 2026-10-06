import mongoose, { Schema, Document, Model } from "mongoose";

export interface INoticeDocument extends Document {
  title: string;
  titleBn?: string;
  content: string;
  contentBn?: string;
  audience: "all" | "parents" | "teachers" | "public";
  priority: "normal" | "important" | "urgent";
  attachmentUrl?: string;
  publishedDate: string;
  isActive: boolean;
  authorName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INoticeDocument>(
  {
    title: { type: String, required: true },
    titleBn: { type: String },
    content: { type: String, required: true },
    contentBn: { type: String },
    audience: {
      type: String,
      enum: ["all", "parents", "teachers", "public"],
      default: "public",
      index: true,
    },
    priority: {
      type: String,
      enum: ["normal", "important", "urgent"],
      default: "normal",
    },
    attachmentUrl: { type: String },
    publishedDate: { type: String, required: true, index: true },
    isActive: { type: Boolean, default: true, index: true },
    authorName: { type: String },
  },
  { timestamps: true }
);

export const NoticeModel: Model<INoticeDocument> =
  mongoose.models.Notice || mongoose.model<INoticeDocument>("Notice", NoticeSchema);
