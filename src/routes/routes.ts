import express from 'express';
import { loginRoutes } from 'modules/login/login.routes';

export const routes = express.Router();

routes.use('/auth', loginRoutes);
