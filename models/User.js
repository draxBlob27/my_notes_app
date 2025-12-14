import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: {type: String, required: true},
    password: { type: String}
},
    { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', UserSchema);