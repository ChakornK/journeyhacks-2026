import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    description: String,
    location: { lat: Number, lng: Number },
    created_at: { type: Date, default: Date.now }
})

export default mongoose.models.Community || mongoose.model('Community', CommunitySchema)