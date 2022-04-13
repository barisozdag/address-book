import express, { Request, Response, NextFunction } from 'express';
import { CallbackError, Document, Types } from 'mongoose';
import Ajv from 'ajv';
import AjvErrors from 'ajv-errors';
import Contact, { IContact } from '../../schemas/contact';
import contactSchema from '../../schemas/contact_json';
import Utils from '../../utils';

const ajv = new Ajv({ allErrors: true });
AjvErrors(ajv);

const validate = ajv.compile(contactSchema);

const contactsRouter = express.Router();

/* Create User */
contactsRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  let body = Utils.trimAll(req.body);
  body = Utils.emptyToNull(body);

  if (!validate(body)) {
    const errors = validate.errors?.map((error) => error.message);
    return res.json({ errors });
  }

  Contact.create(
    body,
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact
    ) => {
      if (error) {
        return res.json({ error: { name: error.name, message: error.message } });
      }
      return res.json(data);
    }
  );
  return;
});

/* Get All Users */
contactsRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
  Contact.find(
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact
    ) => {
      if (error) {
        return res.json({ error: { name: error.name, message: error.message } });
      }
      return res.json(data);
    }
  );
});

/* Get User by Id */
contactsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const paramsId = req.params.id.trim();
  Contact.findById(
    paramsId,
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact
    ) => {
      if (error) {
        return res.json({ error: { name: error.name, message: error.message } });
      }
      return res.json(data);
    }
  );
});

/* Update User by Id */
contactsRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const paramsId = req.params.id.trim();
  let body = Utils.trimAll(req.body);
  body = Utils.emptyToNull(body);

  if (!validate(body)) {
    const errors = validate.errors?.map((error) => error.message);
    return res.json({ errors });
  }

  Contact.findByIdAndUpdate(
    paramsId,
    {
      $set: body,
    },
    {
      new: true,
    },
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact | null
    ) => {
      if (error) {
        return res.json({ error: { name: error.name, message: error.message } });
      }
      return res.json(data);
    }
  );
  return;
});

/* Delete User by Id */
contactsRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const paramsId = req.params.id.trim();

  Contact.findByIdAndRemove(
    paramsId,
    (
      error: CallbackError,
      data: Document<unknown, any, IContact> & IContact
    ) => {
      if (error) {
        return res.json({ error: { name: error.name, message: error.message } });
      }
      return res.json(data);
    }
  );
});

export default contactsRouter;
