import mongoose from "mongoose";

const ConfessionSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  community_id: mongoose.Types.ObjectId,
  content: { type: String, maxlength: 500 },
  created_at: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

export default mongoose.models.Confession ||
  mongoose.model("Confession", ConfessionSchema);
