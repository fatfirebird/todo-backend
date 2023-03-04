import { checkSchema } from 'express-validator';

export const paramValidationSchema = checkSchema({
  id: {
    errorMessage: 'id',
    isNumeric: true,
  },
});

export const textValidationSchema = checkSchema({
  text: {
    isLength: {
      errorMessage: 'text',
      options: { min: 1 },
    },
  },
});
