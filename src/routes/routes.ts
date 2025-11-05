import express from 'express';
import { loginRoutes } from 'modules/login/login.routes';
import { organizationRoutes } from 'modules/organizations/organization.routes';
import { userRoutes } from 'modules/users/users.routes';

export const routes = express.Router();

routes.use('/auth', loginRoutes);
routes.use('/users', userRoutes);
routes.use('/organizations', organizationRoutes);
