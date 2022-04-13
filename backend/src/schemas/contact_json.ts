import { JSONSchemaType } from 'ajv';
import { IContact } from './contact';

const contactSchema: JSONSchemaType<IContact> = {
  type: 'object',
  properties: {
    _id: { type: 'string', nullable: true },
    name: {
      type: 'string',
      minLength: 3,
      errorMessage: {
        type: 'Name field must be "string"',
        minLength: 'name must be longer than 3 characters'
      },
    },
    mail: {
      type: 'string',
      nullable: true,
      pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
      errorMessage: {
        type: 'Mail field must be "string"',
        pattern: 'You must provide a valid e-mail address'
      },
    },
    address: {
      type: 'string',
      minLength: 5,
      errorMessage: {
        type: 'Address field must be "string"',
        minLength: 'address must be longer than 5 characters'
      },
    },
    phones: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string',
        pattern: '^[0-9]{1,10}$',
        maxLength: 10,
        errorMessage: {
          type: 'Phone numbers must be "string"',
          pattern: 'You must provide a valid phone number',
          maxLength: 'Phone numbers must be maximum 10 characters',
        },
      },
      errorMessage: {
        type: 'Phones field must be "array"',
        minItems: 'You must provide a phone number',
        uniqueItems: 'Phone numbers must be unique',
      },
    },
    __v: { type: 'string', nullable: true }
  },
  required: ['name', 'address', 'phones'],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: 'You must provide a name',
      address: 'You must provide an address',
      phones: 'You must provide a phone',
    },
    additionalProperties: 'should not have properties other than "name, address, phones, mail"',
  }
}

export default contactSchema;
