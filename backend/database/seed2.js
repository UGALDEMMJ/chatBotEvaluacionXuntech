import mongoose from 'mongoose';
import User from '../src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function llenarDB() {
    await mongoose.connect(MONGO_URI);
    await User.deleteMany({});

    // 1) Respuestas
  const userAnon = new User({
    email: "anon@correo.com",
    name: "anon",
    password: "123456",
    isActive: true,
    token: "",
  });

  await userAnon.save();
  console.log("Usuario id: ", userAnon._id);
  console.log("Base de datos inicializada con usuario anonimo");

  process.exit(0); 

}

llenarDB().catch(err => {
    console.error("Error al llenar:", err);
    mongoose.connection.close();
});