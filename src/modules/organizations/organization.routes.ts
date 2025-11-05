import express from 'express';
import { shouldAuthenticated } from 'shared/middlewares/shouldAuthenticated';
import { OrganizationsController } from './organization.controller';


export const organizationRoutes = express.Router();

organizationRoutes.use(shouldAuthenticated);

organizationRoutes.post('/', OrganizationsController.create);
