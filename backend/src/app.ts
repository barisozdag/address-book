import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import 'dotenv/config'

import apiRouter from './routes/api';

mongoose
  .connect(process.env.MONGODB || '')
  .then((x) => {
    console.log(`Connected to database: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to database', err.reason);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req: Request, res: Response) => {
  res.send('invalid endpoint');
});

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, 'public/index.html'),
  );
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

export default app;
