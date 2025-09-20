import Conversacion from "../models/Conversacion.js";
import mongoose from 'mongoose';
import Chat from '../models/Chat.js';

export async function crearConversacion(chatId, userId, pregunta, respuesta) {
    try {
        const item = await Conversacion.create([{
            chatId, userId, pregunta: pregunta.trim(), respuesta: respuesta.trim()
        }]);

        await Chat.updateOne(
            { _id: chatId, userId },
            { $set: { updatedAt: new Date() } }
        );
        return item;
    } catch (error) {
        throw new Error("Error al crear la conversación: " + error.message);
    }
}

export async function getConversacionByChatId(chatId, userId, limite = 50, skip = 0, asc = true) {
    const sortOrder = asc ? { createdAt: 1 } : { createdAt: -1 };
    return Conversacion.find({ chatId, userId })
        .sort(sortOrder)
        .skip(skip)
        .limit(limite)
        .lean();
}

export async function listarConversaciones({ userId, limit = 50, skip = 0, asc = true }) {
    const sortOrder = asc ? { createdAt: 1 } : { createdAt: -1 };
    return Conversacion.find({ userId })
        .sort(sortOrder)
        .skip(skip)
        .limit(limit)
        .lean();
}

export async function actualizarConversacion({ conversacionId, userId, data }) {
    const conversacion = await Conversacion.findOneAndUpdate(
        { _id: conversacionId, userId },
        {
            pregunta: data.pregunta?.trim(),
            respuesta: data.respuesta?.trim()
        },
        { new: true }
    );
    return conversacion;
}

export async function deleteConversacionById(conversacionId, userId) {
    try {

        const removed = await Conversacion.findOneAndDelete(
            { _id: conversacionId, userId }
        );
        if (removed) {
            await Chat.updateOne(
                { _id: removed.chatId, userId },
                { $set: { updatedAt: new Date() } }
            );
        }
        return removed;
    } catch (error) {
        throw new Error("Error al eliminar la conversación: " + error.message);
    }
}
