import { createValidator } from '@/core/middleware/create-validator';

import { createTagsArraySchema, textValidationSchema } from '../task-validation';

export const validateCreateTask = () => createValidator([...textValidationSchema, ...createTagsArraySchema(1)]);
