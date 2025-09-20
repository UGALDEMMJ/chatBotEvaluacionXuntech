import { Router } from 'express';
import { getAllRespuestasController } from '../controllers/respuestasController.js';

const respuestasRouter = Router();

respuestasRouter.get('/all', getAllRespuestasController);

export default respuestasRouter;