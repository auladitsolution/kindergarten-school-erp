import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICMSContentDocument extends Document {
  section: string; // school_info, hero, about, programs, facilities, contact, etc.
  data: Record<string, any>;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CMSContentSchema = new Schema<ICMSContentDocument>(
  {
    section: { type: String, required: true, unique: true, index: true },
    data: { type: Schema.Types.Mixed, default: {} },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

export const CMSContentModel: Model<ICMSContentDocument> =
  mongoose.models.CMSContent ||
  mongoose.model<ICMSContentDocument>("CMSContent", CMSContentSchema);
