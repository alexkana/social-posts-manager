import mongoose, { Schema, Model } from "mongoose";

import type { IPost } from "../types/post";

interface PostModel extends Model<IPost> {}

const PostSchema = new Schema<IPost, PostModel>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IPost, PostModel>("Post", PostSchema);
