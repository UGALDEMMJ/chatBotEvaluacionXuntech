import mongoose from "mongoose";

const PreguntasSchema = new mongoose.Schema({
    texto: { type: String, required: true, trim: true },
    answerId: { type: mongoose.Schema.Types.ObjectId, ref: "Respuestas" },
    estado: { type: Boolean, default: false, index: true }   
}, { timestamps: true });

PreguntasSchema.index({ estado: 1, createdAt: -1 });

export default mongoose.model("Preguntas", PreguntasSchema);