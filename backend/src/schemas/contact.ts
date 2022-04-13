import { Schema, model } from 'mongoose';

export interface IContact {
  name: string;
  address: string;
  phones: string[];
  mail?: string;
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phones: [{ type: String, required: true }],
  mail: { type: String }
}, { collection: 'contacts' });

const Contact = model<IContact>('Contact', contactSchema);

export default Contact;
