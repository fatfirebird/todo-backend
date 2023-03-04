import { createValidator } from '../../core/middleware/create-validator';
import { paramValidationSchema, textValidationSchema } from '../task-validation';

export const validateUpdateTask = () => createValidator([...paramValidationSchema, ...textValidationSchema]);
