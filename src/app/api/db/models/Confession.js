import mongoose from "mongoose";

const ConfessionSchema = new mongoose.Schema({
    _id: ObjectId,
    community_id: ObjectId,
    content: { type: String, maxlength: 500 },
    created_at: { type: Date, default: Date.now },
    reactions: [{ type: String, count: Number }]
})

export default mongoose.models.Confession || mongoose.model('Confession', ConfessionSchema)