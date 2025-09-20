import mongoose from "mongoose";

const ConversacionSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

    pregunta: { type: String, required: true, trim: true },
    respuesta: { type: String, required: true, trim: true },

}, { timestamps: true });


ConversacionSchema.index({ chatId: 1, createdAt: -1 });

export default mongoose.model("Conversacion", ConversacionSchema);