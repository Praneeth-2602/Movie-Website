import mongoose from "mongoose";

export function mongooseConnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise(); // Already connected, return existing connection
    } else {
        const uri = 'mongodb+srv://admin:mongoDB@cluster0.kiad0oo.mongodb.net/myDatabase?retryWrites=true&w=majority';
        return mongoose.connect(uri); // Connect to MongoDB using the URI from environment variables
    }
}
