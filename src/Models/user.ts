import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    links: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "link",
        }
    ],
    avatar: {
        type: String,
        default: "https://ui-avatars.com/api/?name=User" // or null
    },
    providers: {
        type: String,
        enum: ["credentials", "google", "github"],
        default: "credentials",
    },

}, { timestamps: true });

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
