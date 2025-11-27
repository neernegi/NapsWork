import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    uploadTime: { type: Date, default: Date.now },
    tags: [{ type: String }],
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
