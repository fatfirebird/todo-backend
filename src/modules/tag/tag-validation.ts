import { checkSchema } from 'express-validator';

export const tagBodyValidation = checkSchema({
  name: {
    isString: true,
    isLength: {
      options: { min: 1 },
    },
  },
  color: {
    isString: true,
    isLength: {
      options: { min: 1 },
    },
  },
});
