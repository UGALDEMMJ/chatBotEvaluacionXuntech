import mongoose from 'mongoose';
import Preguntas from '../src/models/Preguntas.js';
import Respuestas from '../src/models/Respuestas.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function llenarDB() {
    await mongoose.connect(MONGO_URI);

    //Vaciar las colecciones antes de llenarlas
    await Preguntas.deleteMany({});
    await Respuestas.deleteMany({});

    // 1) Respuestas
  const respuetasBot = [
    { texto: "Soy un bot muy cool" },
    { texto: "Atendemos de lunes a viernes de 8:00 a 17:00" },
    { texto: "Estamos en Avenida Central #123" },
    { texto: "Nuestro teléfono es +506 2222-2222" },
    { texto: "Podés escribirnos a contacto@empresa.com" },
    { texto: "Ofrecemos soporte técnico y consultoría" },
    { texto: "Los precios varían según el servicio" },
    { texto: "Aceptamos tarjeta, SINPE y efectivo" },
    { texto: "Todos los productos tienen 1 año de garantía" },
    { texto: "Somos una empresa fundada en 2016" }
  ];

  const respuestas = await Respuestas.insertMany(respuetasBot);

  // 2) Preguntas (mapeadas al mismo índice que su respuesta)
  const preguntasBot = [
    { texto: "quieneres", estado: true, answerId: respuestas[0]._id },
    { texto: "cualeselhorario", estado: true, answerId: respuestas[1]._id },
    { texto: "dondeestanubicados", estado: true, answerId: respuestas[2]._id },
    { texto: "cualessutelefono", estado: true, answerId: respuestas[3]._id },
    { texto: "cualessucorreo", estado: true, answerId: respuestas[4]._id },
    { texto: "queservicioofrecen", estado: true, answerId: respuestas[5]._id },
    { texto: "cualeselprecio", estado: true, answerId: respuestas[6]._id },
    { texto: "quemetodosdepagoaceptan", estado: true, answerId: respuestas[7]._id },
    { texto: "losproductostienengarantia", estado: true, answerId: respuestas[8]._id },
    { texto: "cualeslahistoriadelaempresa", estado: true, answerId: respuestas[9]._id }
  ];

  await Preguntas.insertMany(preguntasBot);

  console.log("Base de datos inicializada con datos de ejemplo.");
  process.exit(0); 

}

llenarDB().catch(err => {
    console.error("Error al llenar la base de datos:", err);
    mongoose.connection.close();
});