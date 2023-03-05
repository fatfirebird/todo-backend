import { Router } from 'express';
import { createValidator } from '../core/middleware/create-validator';
import { paramValidationSchema } from '../core/validation';
import { tagController } from './tag-contoller';
import { tagBodyValidation } from './tag-validation';

const tagRouter = Router();

tagRouter.post('/', createValidator(tagBodyValidation), (req, res) => tagController.createTag(req, res));
tagRouter.get('/:id', createValidator(paramValidationSchema), (req, res) => tagController.getTag(req, res));
tagRouter.delete('/:id', createValidator(paramValidationSchema), (req, res) => tagController.deleteTag(req, res));
tagRouter.patch('/:id', createValidator([...paramValidationSchema]), (req, res) => tagController.updateTag(req, res));

export { tagRouter };
