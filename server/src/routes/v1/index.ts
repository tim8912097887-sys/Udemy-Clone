import { Router } from 'express';
import { authContainer } from './auth/container.js';

const v1Router = Router();

v1Router.use('/auth', authContainer.getRouter());

export default v1Router;
