import express, { Request, Response, NextFunction } from 'express';

const apiRouter = express.Router();

apiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ hello: 'world' });
})

export default apiRouter;
