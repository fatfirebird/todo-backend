import { Router } from 'express';
import { verifyToken } from '../auth/middleware/verify-token';
import { validateUserData } from './middleware/validate-user-data';
import { userController } from './user-controller';

const userRouter = Router();

userRouter.get(
  '/:id',
  verifyToken,
  // #swagger.tags = ['user']
  /* #swagger.security = [{
    "bearerAuth": []
  }] */
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/User' }
    } */
  /* #swagger.responses[401] = {
        schema: { $ref: '#/definitions/Error' }
} */
  /* #swagger.responses[403] = {
        schema: { $ref: '#/definitions/Error' }
} */
  /* #swagger.responses[404] = {
        schema: { $ref: '#/definitions/Error' }
} */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  (req, res) => userController.getUserById(req, res),
);
userRouter.post(
  '/',
  validateUserData(),
  // #swagger.tags = ['user']
  /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/UserWithTokens' }
    } */
  /* #swagger.responses[400] = {
        schema: { $ref: '#/definitions/ValidationError' }
} */
  /* #swagger.responses[500] = {
            schema: { $ref: '#/definitions/Error' }
    } */
  (req, res) => userController.createUser(req, res),
);

export { userRouter };
