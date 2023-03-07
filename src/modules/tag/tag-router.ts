import { Router, Request } from 'express';
import { createValidator } from '@/core/middleware/create-validator';
import { paramValidationSchema } from '@/core/validation';
import { tagController } from './tag-contoller';
import { tagBodyValidation } from './tag-validation';
import { GetTagListQueryParams } from './tag.types';

const tagRouter = Router();

tagRouter.get('/', (req, res) =>
  // #swagger.tags = ['tag']
  /* #swagger.parameters['obj'] = { 
            in: 'query',  
            schema: { $ref: '#/definitions/GetTagListQueryParams' } 
  } */
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/TagList' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  tagController.getTagList(req as unknown as Request<unknown, unknown, unknown, GetTagListQueryParams>, res),
);
tagRouter.post('/', createValidator([...tagBodyValidation, ...tagBodyValidation]), (req, res) =>
  // #swagger.tags = ['tag']
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Tag' }
    } */
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  tagController.createTag(req, res),
);
tagRouter.get('/:id', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['tag']
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Tag' }
    } */
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[404] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  tagController.getTag(req, res),
);
tagRouter.delete('/:id', createValidator(paramValidationSchema), (req, res) =>
  // #swagger.tags = ['tag']
  /* #swagger.responses[201] = {}
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[404] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  tagController.deleteTag(req, res),
);
tagRouter.patch('/:id', createValidator([...paramValidationSchema, ...tagBodyValidation]), (req, res) =>
  // #swagger.tags = ['tag']
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Tag' }
    } */
  /* #swagger.responses[400] = {
            schema: { $ref: '#/definitions/ValidationError' }
    } */
  /* #swagger.responses[404] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  tagController.updateTag(req, res),
);

export { tagRouter };
