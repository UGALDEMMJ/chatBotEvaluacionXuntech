import { Router } from 'express';
import { fetchUserController } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/:id', fetchUserController);

export default userRouter;