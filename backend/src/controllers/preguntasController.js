import { getRespuesta, getAllPreguntas, actualizarPreguntaEstado } from "../services/preguntasService.js";

export async function handleGetRespuestaController(req, res) {
    try {
        const { chatId, texto } = req.body;
        const userId = req.user._id; 
        
        const resultado = await getRespuesta({ chatId, texto, userId });
        
        res.status(200).json({
            success: resultado.success,
            respuesta: resultado.respuesta
        });
    } catch (error) {
        res.status(500).json({ 
            error: error.message, 
            location: "handleGetRespuesta" 
        });
    }
}

export async function handleGetAllPreguntasController(req, res) {
    try {
        const preguntas = await getAllPreguntas();
        res.status(200).json(preguntas);
    } catch (error) {
        res.status(500).json({ 
            error: error.message, 
            location: "handleGetAllPreguntas" 
        });
    }
}

export async function handleActualizarPreguntaController(req, res) {
    try {
        const { preguntaId, estado } = req.body;
        const pregunta = await actualizarPreguntaEstado({ preguntaId, estado });
        
        if (!pregunta) {
            return res.status(404).json({ error: "Pregunta no encontrada" });
        }
        
        res.status(200).json(pregunta);
    } catch (error) {
        res.status(500).json({ 
            error: error.message, 
            location: "handleActualizarPregunta" 
        });
    }
}

