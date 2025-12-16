import mongoose from "mongoose";
let isConnected = false;
export const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB already connected')
        return;
    }
    try {
        let conn = await mongoose.connect(`${process.env.MONGODB_URI}/notes`);
        console.log(`MongoDB connect: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
