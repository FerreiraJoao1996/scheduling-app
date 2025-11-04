import express from 'express';
import { LoginController } from './login.controller';

export const loginRoutes = express.Router();

loginRoutes.post('/login', LoginController.login);
