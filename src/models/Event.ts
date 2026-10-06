import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEventDocument extends Document {
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  date: string;
  time?: string;
  venue: string;
  coverImage?: string;
  category: "Celebration" | "Sports" | "Academic" | "Cultural" | "Holiday";
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEventDocument>(
  {
    title: { type: String, required: true },
    titleBn: { type: String },
    description: { type: String, required: true },
    descriptionBn: { type: String },
    date: { type: String, required: true, index: true },
    time: { type: String },
    venue: { type: String, required: true },
    coverImage: { type: String },
    category: {
      type: String,
      enum: ["Celebration", "Sports", "Academic", "Cultural", "Holiday"],
      default: "Celebration",
    },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const EventModel: Model<IEventDocument> =
  mongoose.models.Event || mongoose.model<IEventDocument>("Event", EventSchema);
