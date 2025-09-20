import { crearChat, listaChats, getChatById, deleteChat } from '../services/chatService.js';

export async function crearChatController(req, res) {
    try {
        const chat = await crearChat(req.user._id, req.body.titulo);
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function listaChatsController(req, res) {
    try {
        const data = await listaChats({
            userId: req.user._id,
            limit: req.query.limit || 20,
            skip: req.query.skip || 0
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getChatController(req, res) {
    try {
        const populate = req.query.populate === "true";
        const limit = Number(req.query.limit) || 50;
        const sortAsc = (req.query.sort || "asc").toLowerCase() === "asc";
        const chat = await getChatById({
            chatId: req.params.id,
            userId: req.user._id,
            populate,
            limit,
            sortAsc
        });
        if (!chat) return res.status(404).json({ error: "No encontrado" });
        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteChatController(req, res) {
    try {
        const oper = await deleteChat({ chatId: req.params.id, userId: req.user._id });
        if (!oper) return res.status(404).json({ error: "No encontrado" });
        res.json(oper);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getChatWithConversacionesController(req, res) {
    try {
        const chat = await getChatById({
            chatId: req.params.id,
            userId: req.user._id,
            populate: true,  
            limit: Number(req.query.limit) || 50,
            sortAsc: true
        });
        
        if (!chat) return res.status(404).json({ error: "Chat no encontrado" });
        
        res.json({
            chat: {
                _id: chat._id,
                titulo: chat.titulo,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt
            },
            conversaciones: chat.conversaciones || []
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}