import { checkSchema } from 'express-validator';
import { TaskStatus } from './task-entity';

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

export const statusValidationSchema = checkSchema({
  status: {
    isIn: {
      options: [[TaskStatus.todo, TaskStatus.inProgress, TaskStatus.done]],
      errorMessage: 'Invalid status, should be todo or in progress or done',
    },
  },
});
