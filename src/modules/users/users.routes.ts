import express from 'express';
import { shouldAuthenticated } from 'shared/middlewares/shouldAuthenticated';
import { UsersController } from './users.controller';

export const userRoutes = express.Router();

userRoutes.use(shouldAuthenticated);

userRoutes.post('/', UsersController.create);
