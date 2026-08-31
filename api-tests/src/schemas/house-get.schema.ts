import { Schema } from 'ajv';

/** JSON schema for a single House, matching interfaces/House.ts. */
export const houseGet: Schema = {
  type: 'object',
  required: [
    'id',
    'name',
    'houseColours',
    'founder',
    'animal',
    'element',
    'ghost',
    'commonRoom',
    'heads',
    'traits',
  ],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    houseColours: { type: 'string' },
    founder: { type: 'string' },
    animal: { type: 'string' },
    element: { type: 'string' },
    ghost: { type: 'string' },
    commonRoom: { type: 'string' },
    heads: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'firstName', 'lastName'],
        properties: {
          id: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
        },
      },
    },
    traits: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
};
