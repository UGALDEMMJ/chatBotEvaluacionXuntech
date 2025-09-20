import { 
    getConversacionByChatId, 
    listarConversaciones, 
    deleteConversacionById, 
    actualizarConversacion 
} from "../services/conversacionService.js";

export async function getConversacionByChatIdController(req, res) {
    try {
        const { chatId } = req.params;
        const conversaciones = await getConversacionByChatId(
            chatId, 
            req.user._id,  // Consistente con chatController
            Number(req.query.limit) || 50,
            Number(req.query.skip) || 0,
            (req.query.sort || "asc").toLowerCase() === "asc"
        );
        res.status(200).json(conversaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function actualizarConversacionController(req, res) {
    try {
        const {conversacionId} = req.params;
        const doc = await actualizarConversacion({
            conversacionId,
            userId: req.user._id, 
            data: req.body
        });
        if (!doc) return res.status(404).json({ error: "No encontrado" });
        res.json(doc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function listarConversacionesController(req, res) {
    try {
        const data = await listarConversaciones({
            userId: req.user._id,  
            limit: Number(req.query.limit) || 50,
            skip: Number(req.query.skip) || 0,
            asc: (req.query.sort || "asc").toLowerCase() === "asc"
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteConversacionByIdController(req, res) {
    try {
        const { conversacionId } = req.params;
        const deletedConversacion = await deleteConversacionById(conversacionId, req.user._id);
        if (!deletedConversacion) {
            return res.status(404).json({ message: "Conversacion not found" });
        }
        res.status(200).json(deletedConversacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export async function agregarConversacionAChatController(req, res) {
    try {
        const { chatId } = req.params;
        const { pregunta } = req.body;
        const userId = req.user._id;

        const resultado = await getRespuesta({ chatId, pregunta, userId });
        
        res.status(201).json({
            success: true,
            conversacion: {
                pregunta,
                respuesta: resultado.respuesta,
                chatId
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}