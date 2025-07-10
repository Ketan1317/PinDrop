import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    hashtags: [
        { type: String }
    ],
    clickCount: {
        type: Number,
        default: 0
    },
    favicon: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    slug: {
        type: String,
        unique: true,
        sparse: true // "Only enforce the unique constraint if the field exists."
    },

}, { timestamps: true });

const LinkModel = mongoose.models.link || mongoose.model("link", userSchema);

export default LinkModel;
