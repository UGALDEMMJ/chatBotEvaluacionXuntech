import { Router } from 'express';
import {
    crearChatController,
    listaChatsController,
    getChatController,
    getChatWithConversacionesController,
    deleteChatController
} from '../controllers/chatController.js';



const chatRouter = Router();
chatRouter.post('/', crearChatController);
chatRouter.get('/user', listaChatsController);
chatRouter.get('/:id', getChatController);
chatRouter.get('/:id/conversaciones', getChatWithConversacionesController);
chatRouter.delete('/:id', deleteChatController);

export default chatRouter;