import { Router } from 'express';
import { handleGetAllPreguntasController, handleGetRespuestaController } from '../controllers/preguntasController.js';

const preguntasRouter = Router();

preguntasRouter.post('/respuesta', handleGetRespuestaController);
preguntasRouter.get('/all', handleGetAllPreguntasController);

export default preguntasRouter;