import Preguntas from "../models/Preguntas.js";
import normalizarTexto from "../utils/normalizarTexto.js";
import { crearConversacion } from "./conversacionService.js";

const defaultRespuesta = "Lo siento, no tengo una respuesta para esa pregunta en este momento.";

export async function getRespuesta(data) {
    try {
        const { chatId, texto, userId } = data;
        const textoNormalizado = normalizarTexto(texto);
        
        const preguntaEncontrada = await Preguntas.findOne({ texto: textoNormalizado }).populate('answerId');
        
        if (!preguntaEncontrada) {
            await Preguntas.create({ texto: textoNormalizado, estado: false });
            await crearConversacion(chatId, userId, texto, defaultRespuesta);
            
            return {
                success: false,
                respuesta: defaultRespuesta   
            };
        }

        if (!preguntaEncontrada.answerId || !preguntaEncontrada.answerId.texto) {
            console.log("answerId no válido:", preguntaEncontrada.answerId);
            await crearConversacion(chatId, userId, texto, defaultRespuesta);
            
            return {
                success: false,
                respuesta: defaultRespuesta    
            };
        }

   
        await Promise.all([
            Preguntas.findByIdAndUpdate(preguntaEncontrada._id, { estado: true }),
            crearConversacion(chatId, userId, texto, preguntaEncontrada.answerId.texto)
        ]);

        return {
            success: true,
            respuesta: preguntaEncontrada.answerId.texto  
        };

    } catch (error) {
        throw new Error("Error al obtener la respuesta: " + error.message);
    }
}

export async function getAllPreguntas() {
    try {
        const preguntas = await Preguntas.find().populate('answerId');
        return preguntas;
    } catch (error) {
        throw new Error("Error al obtener todas las preguntas: " + error.message);
    }
}

export async function actualizarPreguntaEstado({ preguntaId, estado }) {
    try {
        const pregunta = await Preguntas.findByIdAndUpdate(
            preguntaId, 
            { estado }, 
            { new: true }
        ).populate('answerId');
        
        return pregunta;
    } catch (error) {
        throw new Error("Error al actualizar el estado de la pregunta: " + error.message);
    }
}