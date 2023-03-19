import { checkSchema } from 'express-validator';

export const userBodyValidation = checkSchema({
  login: {
    isString: true,
    isLength: {
      options: { min: 1 },
    },
  },
  password: {
    isString: true,
    isLength: {
      options: { min: 8 },
    },
  },
});
