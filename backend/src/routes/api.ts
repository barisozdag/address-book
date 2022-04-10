import express from 'express';
import contactsRouter from './api/contacts';

const apiRouter = express.Router();

apiRouter.use('/contacts', contactsRouter);

export default apiRouter;
