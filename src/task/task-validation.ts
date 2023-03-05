import { checkSchema } from 'express-validator';

export const textValidationSchema = checkSchema({
  text: {
    isLength: {
      options: { min: 1 },
    },
  },
});
