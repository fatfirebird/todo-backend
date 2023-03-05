import { createValidator } from '../../core/middleware/create-validator';
import { paramValidationSchema } from '../../core/validation';
import { textValidationSchema } from '../task-validation';

export const validateUpdateTask = () => createValidator([...paramValidationSchema, ...textValidationSchema]);
