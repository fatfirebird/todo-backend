import { checkSchema } from 'express-validator';

export const textValidationSchema = checkSchema({
  text: {
    isLength: {
      options: { min: 1 },
    },
  },
});

export const createTagsArraySchema = (min = 0) =>
  checkSchema({
    tags: {
      optional: true,
      isArray: {
        errorMessage: 'Should be an array of numbers or empty array or empty value',
        options: {
          min,
        },
      },
    },
    'tags.*': {
      isNumeric: {
        errorMessage: 'Should be an array of numbers or empty value',
      },
    },
  });
