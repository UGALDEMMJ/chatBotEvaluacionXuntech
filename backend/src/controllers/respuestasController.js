import { getAllRespuestas } from "../services/respuestasService.js";

export async function getAllRespuestasController(req, res) {
    try {
        const respuestas = await getAllRespuestas();
        res.status(200).json(respuestas);
    } catch (error) {
        // No exponer stack trace en producción
        const response = { 
            error: error.message, 
            location: "getAllRespuestas" 
        };
        
        // Solo en desarrollo mostrar más detalles
        if (process.env.NODE_ENV === 'development') {
            response.stack = error.stack;
        }
        
        res.status(500).json(response);
    }
}

