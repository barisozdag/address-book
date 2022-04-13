import express from 'express';
import contactsRouter from './api/contacts';
import searchRouter from './api/search';

const apiRouter = express.Router();

apiRouter.use('/contacts', contactsRouter);
apiRouter.use('/search', searchRouter);

export default apiRouter;
