import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    topic: {type: String, required: true},
    tags: [{type: String}],
    content: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);