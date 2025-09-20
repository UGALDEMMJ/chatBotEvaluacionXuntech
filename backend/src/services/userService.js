import User from "../models/User.js";

export async function getUser(data){
    try{
    const { userId } = data;
    const res = await User.findById(userId);
    return res;
    } catch (error) {
        throw new Error("Error al obtener el usuario: " + error.message);
    }
}