import mongoose from "mongoose";

const RespuestasSchema = new mongoose.Schema({
    texto: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model("Respuestas", RespuestasSchema);