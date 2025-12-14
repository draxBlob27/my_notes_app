import { connectDB } from "@/db/connectDB";
import Note from "@/models/Note";
import User from "@/models/User";

export const getNote = async (user_id) => {
    await connectDB();
    let notes = await Note.find({ userId: user_id });
    const data = notes.map((note) => ({
        id: note._id,
        tags: note.tags,
        topic: note.topic,
        content: note.content
    }))

    return data ?? null;
}

export const getUser = async (email_got) => {
    await connectDB();
    let user = await User.findOne({ email: email_got });

    if (!user)
        return null;

    return user;
};

export const createNote = async (userId, body) => {
    await connectDB();
    await Note.create({
        topic: body.topic,
        tags: body.tags || [],
        content: body.content,
        userId: userId
    });
}

export const createUser = async (user) => {
    await connectDB();
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) return existingUser;

    const base = user.email.split("@")[0];
    const username = user.username??`${base}_${Math.random().toString(36).slice(2, 6)}`;

    let newUser = await User.create({
        name: user.name,
        username: username,
        email: user.email,
        password: user.password ?? null
    })

    return newUser;
}

export const editNote = async (noteId, body) => {
    await connectDB();
    await Note.findOneAndUpdate({_id: noteId}, body);
}

export const deleteNote = async (noteId) => {
    await connectDB();
    await Note.deleteOne({_id: noteId});
}