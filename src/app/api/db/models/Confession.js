import mongoose from "mongoose";

const ConfessionSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  community_id: mongoose.Types.ObjectId,
  content: { type: String, maxlength: 500 },
  created_at: { type: Date, default: Date.now },
  likes: Number,
});

export default mongoose.models.Confession ||
  mongoose.model("Confession", ConfessionSchema);
