import Respuestas from "../models/Respuestas.js";

export async function getAllRespuestas(){
    try {
        const respuestas = await Respuestas.find().lean(); // .lean() para mejor performance
        return respuestas;
    } catch (error) {
        throw new Error("Error al obtener todas las respuestas: " + error.message);
    }
}

// Si necesitas más funcionalidades:
export async function getRespuestaById(id) {
    try {
        const respuesta = await Respuestas.findById(id).lean();
        return respuesta;
    } catch (error) {
        throw new Error("Error al obtener la respuesta: " + error.message);
    }
}

export async function crearRespuesta(texto) {
    try {
        const nuevaRespuesta = new Respuestas({ text: texto });
        const resultado = await nuevaRespuesta.save();
        return resultado;
    } catch (error) {
        throw new Error("Error al crear la respuesta: " + error.message);
    }
}
