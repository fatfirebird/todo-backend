import { createValidator } from '../../core/middleware/create-validator';
import { paramValidationSchema } from '../../core/validation';
import { textValidationSchema, createTagsArraySchema } from '../task-validation';

export const validateUpdateTask = () =>
  createValidator([...paramValidationSchema, ...textValidationSchema, ...createTagsArraySchema()]);
