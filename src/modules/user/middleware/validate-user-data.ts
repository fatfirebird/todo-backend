import { createValidator } from '@/core/middleware/create-validator';
import { userBodyValidation } from '../user-validation';

export const validateUserData = () => createValidator([...userBodyValidation]);
