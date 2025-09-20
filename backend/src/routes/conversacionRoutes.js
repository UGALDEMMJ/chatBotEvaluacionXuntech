import { Router } from 'express';
import {
    getConversacionByChatIdController,
    actualizarConversacionController,
    listarConversacionesController,
    deleteConversacionByIdController

 } from '../controllers/conversacionController.js';

const conversacionRouter = Router();

conversacionRouter.get('/conversaciones', listarConversacionesController);
conversacionRouter.get('/conversaciones/:chatId', getConversacionByChatIdController);
conversacionRouter.put('/conversaciones/:conversacionId', actualizarConversacionController);
conversacionRouter.delete('/conversaciones/:conversacionId', deleteConversacionByIdController);

export default conversacionRouter;  