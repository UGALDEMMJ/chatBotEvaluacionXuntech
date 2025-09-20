import Chat from "../models/Chat.js";
import Conversacion from "../models/Conversacion.js";
import mongoose from "mongoose";

export async function crearChat(userId, titulo) {
  try {
    const nuevoChat = new Chat({
      userId: userId,
      titulo: titulo
    });
    const res = await nuevoChat.save();
    return res;
  } catch (error) {
    throw new Error("Error al crear el chat: " + error.message);
  }
}

export async function listaChats({ userId, limit = 20, skip = 0 }) {
  return Chat.find({ userId })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
}

export async function getChatById({ chatId, userId, populate = false, limit = 50, sortAsc = true }) {
  if (!populate) {
    return Chat.findOne({ _id: chatId, userId }).lean();
  }
  const sortOpt = sortAsc ? { createdAt: 1 } : { createdAt: -1 };
  return Chat.findOne({ _id: chatId, userId })
    .populate({
      path: "conversaciones",
      options: { sort: sortOpt, limit }
    })
    .lean();
}

export async function deleteChat({ chatId, userId }) {
  try {
    await Conversacion.deleteMany({ chatId });
    await Chat.deleteOne({ _id: chatId, userId });
    return { eliminado: true };
  } catch (error) {
    throw new Error("Error al eliminar el chat: " + error.message);
  }
}