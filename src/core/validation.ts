import { checkSchema } from 'express-validator';

export const paramValidationSchema = checkSchema({
  id: {
    isNumeric: true,
  },
});
