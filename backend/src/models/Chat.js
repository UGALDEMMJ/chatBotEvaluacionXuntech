import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    titulo: { type: String, trim: true },
}, { timestamps: true });

ChatSchema.virtual("conversaciones",{
    ref: "Conversacion",
    localField: "_id",
    foreignField: "chatId",
    justOne: false,
})

ChatSchema.set("toObject", { virtuals: true });
ChatSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Chat", ChatSchema);