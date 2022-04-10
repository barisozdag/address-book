import { Schema, model } from 'mongoose';

export interface IContact {
  name: string;
  address: string;
  phones: number[];
  mail?: string;
}

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phones: [{ type: Number, required: true }],
  mail: { type: String }
}, { collection: 'contacts' });

const Contact = model<IContact>('Contact', contactSchema);

export default Contact;
