import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI  

export async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log("Conectado a Mongo por Container");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}