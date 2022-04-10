import express, { Request, Response, NextFunction } from 'express';
import { CallbackError, Document, Types } from 'mongoose';
import Contact, { IContact } from '../../schemas/contact';

const contactsRouter = express.Router();

contactsRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  Contact.create(
    req.body,
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact & { _id: Types.ObjectId; }
    ) => {
      if (error) {
        return next(error);
      }
      res.json(data);
    }
  );
});

contactsRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
  Contact.find(
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact & { _id: Types.ObjectId; }
    ) => {
      if (error) {
        return next(error);
      }
      res.json(data);
    }
  );
});

contactsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  Contact.findById(
    req.params.id,
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact & { _id: Types.ObjectId; }
    ) => {
      if (error) {
        return next(error);
      }
      res.json(data);
    }
  );
});

contactsRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  Contact.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact & { _id: Types.ObjectId; }
    ) => {
      if (error) {
        return next(error);
      }
      res.json(data);
    }
  );
});

contactsRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  Contact.findByIdAndRemove(
    req.params.id,
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact & { _id: Types.ObjectId; }
    ) => {
      if (error) {
        return next(error);
      }
      res.json(data);
    }
  );
});

export default contactsRouter;
