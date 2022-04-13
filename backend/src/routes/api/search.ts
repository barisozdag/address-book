import express, { Request, Response, NextFunction } from 'express';
import { CallbackError, Document, Types } from 'mongoose';
import Contact, { IContact } from '../../schemas/contact';

const searchRouter = express.Router();

searchRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  let q = req.query.q as string;
  q = q.trim();

  if (q.length === 0) {
    return res.json([]);
  }

  const search = new RegExp(q, 'i');
  Contact.find(
    {
      $or: [
        { name: search },
        { mail: search },
        { address: search },
        { phones: search },
      ]
    },
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact & { _id: Types.ObjectId; }
    ) => {
      if (error) {
        return next(error);
      }

      return res.json(data);
    }
  );
  return;
});

export default searchRouter;
